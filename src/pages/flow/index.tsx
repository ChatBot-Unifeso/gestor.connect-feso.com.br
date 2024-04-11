import { useCallback, useEffect, useState } from "react"
import {
	Edge,
	EdgeChange,
	Node,
	NodeChange,
	Node as NodeRF,
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
} from "reactflow"
import { ManageFlow } from "../manage-flow"
import { Sidebar } from "../sidebar"
import { CreateMenuDialog } from "./components/CreateMenu"
import { InfoMenuDialog, InfoMenuDialogProps } from "./components/InfoMenu"

export interface MenuProps {
	id: string
	title: string
	type: "menu" | "option"
	parentId?: string
	content: string
}

export interface FlowProps {
	id: string
	title: string
	flowTree?: FlowTree

	nodes?: NodeRF[]
	edges?: Edge[]
	menus?: MenuProps[]
}

interface FlowTree {
	[key: string]: string[]
}

const menusStd: FlowProps[] = [
	{
		id: "1",
		title: "Menu 1",
		//menus: [
		// {
		// 	id: "1",
		// 	title: "Menu 1.1",
		// },
		// {
		// 	id: "2",
		// 	title: "Menu 1.2",
		// 	parentId: "1",
		// },
		// {
		// 	id: "3",
		// 	title: "Menu 1.3",
		// 	parentId: "1",
		// },
		// {
		// 	id: "4",
		// 	title: "Menu 1.4",
		// 	parentId: "1",
		// },
		// {
		// 	id: "5",
		// 	title: "Menu 1.5",
		// 	parentId: "2",
		// },
		// {
		// 	id: "6",
		// 	title: "Menu 1.6",
		// 	parentId: "2",
		// },
		// {
		// 	id: "7",
		// 	title: "Menu 1.7",
		// 	parentId: "1",
		// },
		//],
	},
	// {
	// 	id: "id-2",
	// 	title: "Menu 2",
	// 	edges: [{ id: "e3-4", source: "4", target: "3" }],
	// 	menus: [
	// 		{
	// 			id: "3",
	// 			title: "Menu 2.1",
	// 		},
	// 		{
	// 			id: "4",
	// 			title: "Menu 2.2",
	// 			parentId: "3",
	// 		},
	// 	],
	// },
]

interface RenderNodeReturn {
	node: NodeRF
	flowTree: FlowTree
}

function renderNode(
	menu: MenuProps,
	allNodes: NodeRF[],
	menus: MenuProps[],
	flowTree: FlowTree
): RenderNodeReturn | Error {
	let thisFlowTree = { ...flowTree }
	let parentNode: NodeRF | undefined
	const nodeParentId = allNodes.find((n) => n.id === menu.parentId)
	if (!nodeParentId) {
		const parentStillNotRendered = menus.find((m) => m.id === menu.parentId)
		if (!parentStillNotRendered) return new Error("Menu pai não encontrado")
		const renderParent = renderNode(parentStillNotRendered, allNodes, menus, thisFlowTree)
		if (renderParent instanceof Error) return renderParent
		parentNode = renderParent.node
		thisFlowTree = renderParent.flowTree
	} else {
		parentNode = nodeParentId
	}

	const lenBrothers = thisFlowTree[parentNode.id]?.length || 0
	//console.log("lenBrothers", lenBrothers)
	const node: NodeRF = {
		id: menu.id,
		data: { label: menu.title },
	} as NodeRF

	if (menu.type === "option") {
		node.style = { border: "1px solid #327D6B", color: "#327D6B" }
	}

	if (lenBrothers === 0) {
		node.position = { x: parentNode.position.x + 256, y: parentNode.position.y }
	} else {
		let chooseLenBrothers = Math.ceil(lenBrothers / 2)

		if (lenBrothers % 2 === 0) {
			node.position = {
				x: parentNode.position.x + 256,
				y: parentNode.position.y - Math.sin(45) * 256 * chooseLenBrothers,
			}
		} else {
			node.position = {
				x: parentNode.position.x + 256,
				y: parentNode.position.y + Math.sin(45) * 256 * chooseLenBrothers,
			}
		}
	}
	thisFlowTree[parentNode.id] = [...(thisFlowTree[parentNode.id] || []), node.id]

	const someNodeWithSamePosition = allNodes.find((nd) => {
		return nd.position.x === node.position.x && nd.position.y === node.position.y
	})
	if (someNodeWithSamePosition) {
		node.position = { x: node.position.x + 180, y: node.position.y + 180 }
	}

	// console.log(
	// 	"render node",
	// 	node,
	// 	thisFlowTree,
	// 	parentNode.position.y + Math.sin(45) * 256 * (lenBrothers - 1)
	// )
	return { node, flowTree: thisFlowTree }
}

function renderNodes(flow: FlowProps): FlowProps | Error {
	let flowTree: FlowTree = {}
	if (!flow.menus) return flow
	const rootNode = flow.menus.filter((n) => !n.parentId)
	if (!rootNode?.length) return flow
	if (rootNode!.length > 1) return new Error("O Flow não pode ter mais de um menu raiz!")

	const renderFlow: FlowProps = { ...flow }
	const nodes = []
	const edges = []

	nodes.push({ id: rootNode[0].id, data: { label: rootNode[0].title }, position: { x: 0, y: 0 } })

	const menus = flow.menus.filter((m) => m.id !== rootNode[0].id)
	for (const menu of menus) {
		const render = renderNode(menu, nodes, flow.menus, flowTree)
		if (render instanceof Error) return render
		nodes.push(render.node)
		flowTree = render.flowTree
	}

	for (const key in flowTree) {
		const children = flowTree[key]
		for (const child of children) {
			edges.push({ id: `${key}-${child}`, source: key, target: child, type: "straight-edge" })
		}
	}

	renderFlow.nodes = nodes
	renderFlow.edges = edges

	renderFlow.flowTree = flowTree
	return renderFlow
}

export const Flow = () => {
	const [menus, setMenus] = useState<FlowProps[]>([])
	const [menu, setMenu] = useState<FlowProps | undefined>()
	const [nodes, setNodes] = useState<Node[] | undefined>()
	const [edges, setEdges] = useState<Edge[] | undefined>()
	const [openMenuInfo, setOpenMenuInfo] = useState<InfoMenuDialogProps | undefined>()

	function renderFlow(flow: FlowProps) {
		setNodes([])
		setEdges([])
		const render = renderNodes(flow)
		if (render instanceof Error) {
			console.error(render.message)
			return
		}
		setMenus((ms) => {
			if (!ms) return [render]
			const flows = ms
			const renderId = Number(render.id)
			flows[renderId - 1] = render
			return flows
		})
		setMenu(render)
		if (!render.nodes || !render.edges) return
		setNodes(render.nodes)
		setEdges(render.edges)
		console.log("render flow tree", render)
	}

	useEffect(() => {
		menusStd.forEach((m, i) => {
			const render = renderNodes(m)
			if (render instanceof Error) {
				console.error(render.message)
				return
			}
			setMenus((ms) => {
				if (!ms) return [render]
				const otherMenus = ms.filter((m) => m.id !== render.id)
				return [...otherMenus, render]
			})
			if (i === 0) {
				setMenu(render)
				setNodes(render.nodes)
				setEdges(render.edges)
			}
		})
	}, [])

	const onNodesChange = useCallback(
		(changes: NodeChange[]) =>
			setNodes((nds) => {
				if (!nds) return []
				return applyNodeChanges(changes, nds)
			}),
		[]
	)
	const onEdgesChange = useCallback(
		(changes: EdgeChange[]) =>
			setEdges((eds) => {
				if (!eds) return []
				return applyEdgeChanges(changes, eds)
			}),
		[]
	)

	const onConnect = useCallback(
		(connection: any) => {
			const edge = { ...connection, type: "custom-edge" }
			setEdges((eds: any) => addEdge(edge, eds))
		},
		[setEdges]
	)

	function handleMenuChange(flow: FlowProps) {
		const selectedFlow = menus.find((m) => m.id === flow.id)
		if (!selectedFlow) {
			console.error("Menu não encontrado")
			return
		}
		renderFlow(selectedFlow)
	}

	function deleteMenu(menuP: FlowProps) {
		const newMenus = menus.filter((m) => m.id !== menuP.id)
		setMenus(newMenus)
		if (menuP.id === menu?.id) {
			setMenu(undefined)
			setNodes(undefined)
			setEdges(undefined)
		}
	}

	function addMenuNode(menuNode: MenuProps) {
		if (!menu) return
		const allFlow = [...menus]
		const selectFlow = allFlow.find((m) => m.id === menu.id)
		if (!selectFlow) return new Error("Flow não encontrado")

		if (!menuNode.parentId) {
			if (menu.menus) return new Error("O menu raiz já foi criado. Selecione um menu pai")
			if (menuNode.type !== "menu") return new Error("O menu raiz deve ser do tipo menu")
			selectFlow.menus = []
		}

		selectFlow?.menus?.push(menuNode)

		renderFlow(selectFlow)

		// setCenter(lastNode!.position.x, lastNode!.position.y, { zoom: 2.3, duration: 1000 })
	}

	function addFlow(flow: FlowProps) {
		const lenMenus = menus.length
		flow.id = `${lenMenus + 1}`
		setMenus((flows) => [...flows, flow])
		//renderFlow(allFlow)
	}

	function handleInfoMenu(node: NodeRF) {
		const chMenu = menu?.menus?.find((m) => m.id === node.id)
		if (!chMenu) return
		setOpenMenuInfo({ open: true, menu: chMenu })
	}

	function closeInfoMenu() {
		setOpenMenuInfo({ open: false, menu: undefined })
	}

	return (
		<div className="flex w-screen">
			<Sidebar
				menuState={menu}
				menus={menus}
				handleMenuChange={handleMenuChange}
				deleteMenu={deleteMenu}
				addFlow={addFlow}
			/>
			<InfoMenuDialog
				menu={openMenuInfo?.menu}
				open={openMenuInfo?.open}
				closeInfoMenu={closeInfoMenu}
				flow={menu}
			/>
			<CreateMenuDialog addMenuNode={addMenuNode} flow={menu} />
			<section className="h-screen w-full flex justify-between items-center border-1 border-zinc-400">
				{menu ? (
					<>
						<ManageFlow
							nodes={nodes}
							edges={edges}
							onEdgesChange={onEdgesChange}
							onNodesChange={onNodesChange}
							onConnect={onConnect}
							handleInfoMenu={handleInfoMenu}
						/>
					</>
				) : (
					<div className="flex justify-center items-center w-full h-full">
						<h1 className="text-4xl font-bold text-zinc-400">Sem menus</h1>
					</div>
				)}
			</section>
		</div>
	)
}

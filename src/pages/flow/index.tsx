import { useCallback, useEffect, useState } from "react"
import {
	Edge,
	EdgeChange,
	Node,
	NodeChange,
	Node as NodeRF,
	applyEdgeChanges,
	applyNodeChanges,
	useReactFlow,
} from "reactflow"
import { ManageFlow } from "../manage-flow"
import { Sidebar } from "../sidebar"
import { CreateMenuDialog } from "./components/CreateMenu"

export interface MenuNode {
	id: string
	title: string
}

export interface MenuProps {
	id: string
	title: string

	nodes: NodeRF[]
	edges: Edge[]
}

const menusStd: MenuProps[] = [
	{
		id: "id-1",
		title: "Menu 1",
		nodes: [
			{ id: "1", position: { x: 0, y: 0 }, data: { label: "1" }, height: 15, width: 15 },
			{ id: "2", position: { x: 0, y: 100 }, data: { label: "2" }, height: 15, width: 15 },
		],
		edges: [{ id: "e1-2", source: "1", target: "2" }],
	},
	{
		id: "id-2",
		title: "Menu 2",
		nodes: [
			{
				id: "3",
				position: { x: 5, y: 10 },
				data: { label: "teste 1" },
				height: 15,
				width: 15,
			},
			{
				id: "4",
				position: { x: 0, y: 100 },
				data: { label: "teste 2" },
				height: 15,
				width: 15,
			},
		],
		edges: [{ id: "e3-4", source: "4", target: "3" }],
	},
]

export const Flow = () => {
	const [menus, setMenus] = useState<MenuProps[]>([])
	const [menu, setMenu] = useState<MenuProps | undefined>()
	const [nodes, setNodes] = useState<Node[] | undefined>()
	const [edges, setEdges] = useState<Edge[] | undefined>()

	useEffect(() => {
		setMenus(menusStd)
		setNodes(menusStd[0].nodes)
		setEdges(menusStd[0].edges)
		setMenu(menusStd[0])
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

	function handleMenuChange(menuP: MenuProps) {
		const selectMenu = menus.find((m) => m.id === menuP.id)
		if (!selectMenu) {
			console.error("Menu não encontrado")
			return
		}
		setMenu(selectMenu)
		setNodes(selectMenu.nodes)
		setEdges(selectMenu.edges)
	}

	function deleteMenu(menuP: MenuProps) {
		const newMenus = menus.filter((m) => m.id !== menuP.id)
		setMenus(newMenus)
		if (menuP.id === menu?.id) {
			setMenu(undefined)
			setNodes(undefined)
			setEdges(undefined)
		}
	}

	const { zoomIn, zoomOut, setCenter } = useReactFlow()

	function addMenuNode(menuNode: MenuNode) {
		if (!menu) return
		const lenMenu = menu.nodes.length - 1
		const someNode = menu.nodes[lenMenu]
		const position = {
			x: someNode.position.x + 256,
			y: someNode.position.y,
		}
		const newNodes = [
			...menu.nodes,
			{ id: menuNode.id, position, data: { label: menuNode.title }, height: 15, width: 15 },
		]
		setNodes(newNodes)
		setMenu({ ...menu, nodes: newNodes })
		setMenus((ms) => {
			const newMenus = ms.map((m) => {
				if (m.id === menu.id) return { ...m, nodes: newNodes }
				return m
			})
			return newMenus
		})
		setCenter(position.x, position.y, { zoom: 2.3, duration: 1000 })
	}

	return (
		<div className="flex w-screen">
			<Sidebar
				menuState={menu}
				menus={menus}
				handleMenuChange={handleMenuChange}
				deleteMenu={deleteMenu}
			/>
			<CreateMenuDialog addMenuNode={addMenuNode} />
			<section className="h-screen w-full flex justify-between items-center border-1 border-zinc-400">
				{menu ? (
					<>
						<ManageFlow
							nodes={nodes}
							edges={edges}
							onEdgesChange={onEdgesChange}
							onNodesChange={onNodesChange}
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

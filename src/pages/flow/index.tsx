import { useCallback, useState } from "react"
import {
	Edge,
	EdgeChange,
	NodeChange,
	Node as NodeRF,
	applyEdgeChanges,
	applyNodeChanges,
} from "reactflow"
import { ManageFlow } from "../manage-flow"
import { Sidebar } from "../sidebar"

export interface MenuProps {
	id: number
	title: string

	nodes: NodeRF[]
	edges: Edge[]
}

export const menus: MenuProps[] = [
	{
		id: 0,
		title: "Menu 1",
		nodes: [
			{ id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
			{ id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
		],
		edges: [{ id: "e1-2", source: "1", target: "2" }],
	},
	{
		id: 1,
		title: "Menu 2",
		nodes: [
			{ id: "3", position: { x: 5, y: 10 }, data: { label: "teste 1" } },
			{ id: "4", position: { x: 0, y: 100 }, data: { label: "teste 2" } },
		],
		edges: [{ id: "e3-4", source: "4", target: "3" }],
	},
]

export const Flow = () => {
	const [menu, setMenu] = useState<MenuProps | undefined>(menus[0])
	const [nodes, setNodes] = useState(menus[0].nodes)
	const [edges, setEdges] = useState(menus[0].edges)

	const onNodesChange = useCallback(
		(changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
		[]
	)
	const onEdgesChange = useCallback(
		(changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
		[]
	)

	function handleMenuChange(menuP: MenuProps) {
		console.log(menuP)
		setMenu(menuP)
		setNodes(menuP.nodes)
		setEdges(menuP.edges)
	}

	return (
		<div className="flex w-screen">
			<Sidebar menuState={menu} handleMenuChange={handleMenuChange} />
			<section className="h-screen w-full flex justify-between items-center border-1 border-zinc-400">
				{menu ? (
					<ManageFlow
						nodes={nodes}
						edges={edges}
						onEdgesChange={onEdgesChange}
						onNodesChange={onNodesChange}
					/>
				) : (
					<div className="flex justify-center items-center w-full h-full">
						<h1 className="text-4xl font-bold text-zinc-400">Selecione um menu</h1>
					</div>
				)}
			</section>
		</div>
	)
}

import ReactFlow, {
	Background,
	BackgroundVariant,
	Controls,
	EdgeChange,
	NodeChange,
} from "reactflow"
import "reactflow/dist/style.css"

import { Edge, Node as NodeRF } from "reactflow"
import { StraightEdge } from "./straightEdge"

type OnChange<ChangesType> = (changes: ChangesType[]) => void

interface ManageFlowProps {
	nodes: NodeRF[] | undefined
	edges: Edge[] | undefined
	onNodesChange: OnChange<NodeChange>
	onEdgesChange: OnChange<EdgeChange>
	onConnect: (connection: any) => void
	handleInfoMenu: (node: NodeRF) => void
}

export const ManageFlow = ({
	edges,
	nodes,
	onNodesChange,
	onEdgesChange,
	onConnect,
	handleInfoMenu,
}: ManageFlowProps) => {
	return (
		<ReactFlow
			nodes={nodes}
			edges={edges}
			onNodesChange={onNodesChange}
			onEdgesChange={onEdgesChange}
			fitView={true}
			onConnect={onConnect}
			edgeTypes={{
				"straight-edge": StraightEdge,
			}}
			onNodeDoubleClick={(_, node) => {
				handleInfoMenu(node)
			}}
		>
			<Controls />
			<Background gap={12} size={1} variant={BackgroundVariant.Cross} />
		</ReactFlow>
	)
}

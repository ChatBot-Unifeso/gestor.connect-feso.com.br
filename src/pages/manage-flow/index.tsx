import ReactFlow, {
	Background,
	BackgroundVariant,
	Controls,
	EdgeChange,
	MiniMap,
	NodeChange,
} from "reactflow"
import "reactflow/dist/style.css"

import { Edge, Node as NodeRF } from "reactflow"

type OnChange<ChangesType> = (changes: ChangesType[]) => void

interface ManageFlowProps {
	nodes: NodeRF[] | undefined
	edges: Edge[] | undefined
	onNodesChange: OnChange<NodeChange>
	onEdgesChange: OnChange<EdgeChange>
}

export const ManageFlow = ({ edges, nodes, onNodesChange, onEdgesChange }: ManageFlowProps) => {
	return (
		<ReactFlow
			nodes={nodes}
			edges={edges}
			onNodesChange={onNodesChange}
			onEdgesChange={onEdgesChange}
		>
			<Controls />
			<MiniMap />
			<Background gap={12} size={1} variant={BackgroundVariant.Cross} />
		</ReactFlow>
	)
}

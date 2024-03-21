import ReactFlow, { Background, BackgroundVariant, Controls, MiniMap } from "reactflow"
import "reactflow/dist/style.css"

import { Edge, Node as NodeRF } from "reactflow"

interface ManageFlowProps {
	nodes: NodeRF[]
	edges: Edge[]
	onNodesChange: any
	onEdgesChange: any
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

import { BaseEdge, getStraightPath } from "reactflow"

export function StraightEdge({ id, sourceX, sourceY, targetX, targetY }: any) {
	const [edgePath] = getStraightPath({
		sourceX,
		sourceY,
		targetX,
		targetY,
	})

	return (
		<>
			<BaseEdge id={id} path={edgePath} />
		</>
	)
}

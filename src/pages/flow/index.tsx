import { ManageFlow } from "../manage-flow"
import { Sidebar } from "../sidebar"

export const Flow = () => {
	return (
		<div className="flex w-screen">
			<Sidebar />
			<section className="h-screen w-full flex justify-between items-center border-1 border-zinc-400">
				<ManageFlow />
			</section>
		</div>
	)
}

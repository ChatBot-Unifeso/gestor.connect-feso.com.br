import { useState } from "react"
import { ManageFlow } from "../manage-flow"
import { Sidebar } from "../sidebar"

export const Flow = () => {
	const [menu, setMenu] = useState(0)

	return (
		<div className="flex w-screen">
			<Sidebar menuState={menu} setMenuState={setMenu} />
			<section className="h-screen w-full flex justify-between items-center border-1 border-zinc-400">
				<ManageFlow />
			</section>
		</div>
	)
}

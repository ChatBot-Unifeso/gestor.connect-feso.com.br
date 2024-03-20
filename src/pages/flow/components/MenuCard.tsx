import { Trash } from "phosphor-react"

interface MenuCardProps {
	title: string
	isActive: boolean
	isSelect: boolean
	id: number
	setMenuState: React.Dispatch<React.SetStateAction<number>>
}

export function MenuCard(props: MenuCardProps) {
	return (
		<div 
			className="shadow-md rounded-md w-full h-20 pr-3 flex items-center justify-between border border-green-500 cursor-pointer"
			onClick={() => props.setMenuState(props.id)}
			>
			<div className="flex gap-5 h-full items-center">
				<div
					className={`w-3 h-full  rounded-s-md ${props.isSelect ? "bg-[#327D6B]" : ""}`}
				></div>
				<div className="flex flex-col">
					{props.isActive ? (
						<p className="text-green-400 text-sm">Ativo</p>
					) : (
						<p className="text-slate-500 text-sm">Inativo</p>
					)}
					<h1 className="text-center font-bold text-[#327D6B] text-lg">{props.title}</h1>
				</div>
			</div>
			<div title="Excluir menu">
				<Trash size={28} className="text-red-300" weight="fill" />
			</div>
		</div>
	)
}

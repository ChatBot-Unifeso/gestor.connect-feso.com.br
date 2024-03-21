import { Trash } from "phosphor-react"
import { MenuProps } from ".."

interface MenuCardProps {
	isActive: boolean
	isSelect: boolean
	data: MenuProps
	handleMenuChange(menu: MenuProps): void
}

export function MenuCard({ data, isActive, isSelect, handleMenuChange }: MenuCardProps) {
	return (
		<div
			className="shadow-md rounded-md w-full h-20 pr-3 flex items-center justify-between border border-green-500 cursor-pointer"
			onClick={() => handleMenuChange(data)}
		>
			<div className="flex gap-5 h-full items-center">
				<div className={`w-3 h-full  rounded-s-md ${isSelect ? "bg-[#327D6B]" : ""}`}></div>
				<div className="flex flex-col">
					{isActive ? (
						<p className="text-green-400 text-sm">Ativo</p>
					) : (
						<p className="text-slate-500 text-sm">Inativo</p>
					)}
					<h1 className="text-center font-bold text-[#327D6B] text-lg">{data.title}</h1>
				</div>
			</div>
			<div title="Excluir menu">
				<Trash size={28} className="text-red-300" weight="fill" />
			</div>
		</div>
	)
}

import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	useDisclosure,
} from "@chakra-ui/react"
import { List } from "phosphor-react"

import React from "react"
import { FlowProps } from "../flow"
import { CreateFlowDialog } from "../flow/components/CreateFlow"
import { MenuCard } from "../flow/components/MenuCard"

interface SidebarProps {
	menus: FlowProps[]
	menuState: FlowProps | undefined
	handleMenuChange(menu: FlowProps): void
	deleteMenu(menu: FlowProps): void
	addFlow(flow: FlowProps): void
}

export function Sidebar({ menuState, handleMenuChange, menus, deleteMenu, addFlow }: SidebarProps) {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const btnRef = React.useRef()

	return (
		<>
			<button
				ref={btnRef as any}
				className="absolute left-2 top-2 p-3 bg-gray-200 z-10 rounded-md"
				onClick={onOpen}
			>
				<List size={28} />
			</button>
			<Drawer
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				finalFocusRef={btnRef as any}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader>
						<h1 className="font-2xl text-[#327D6B] font-bold">Seus flows de menu</h1>
						<DrawerCloseButton className="my-2" />
					</DrawerHeader>

					<DrawerBody>
						<div className="w-full flex flex-col gap-6 my-4">
							{menus.map((menu, i) => (
								<MenuCard
									data={menu}
									key={menu.id}
									isActive={i === 0}
									isSelect={menuState?.id === menu.id}
									handleMenuChange={handleMenuChange}
									deleteMenu={deleteMenu}
								/>
							))}
						</div>
					</DrawerBody>

					<DrawerFooter className="flex gap-3 w-full justify-between">
						<CreateFlowDialog addFlow={addFlow} />
						<button
							className="bg-[#327D6B] text-white px-4 py-2 font-bold rounded-md"
							onClick={onClose}
						>
							Cancelar
						</button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	)
}

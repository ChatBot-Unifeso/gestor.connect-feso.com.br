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
import { MenuProps } from "../flow"
import { MenuCard } from "../flow/components/MenuCard"

interface SidebarProps {
	menus: MenuProps[]
	menuState: MenuProps | undefined
	handleMenuChange(menu: MenuProps): void
}

export function Sidebar({ menuState, handleMenuChange, menus }: SidebarProps) {
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
									isSelect={menuState?.id === i}
									handleMenuChange={handleMenuChange}
								/>
							))}
						</div>
					</DrawerBody>

					<DrawerFooter>
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

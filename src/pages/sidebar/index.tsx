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
import { MenuCard } from "../flow/components/MenuCard"

interface SidebarProps {
	menuState: number
	setMenuState: React.Dispatch<React.SetStateAction<number>>
}

const menus = [
	"Menu 1",
	"Menu 2",
]

export function Sidebar({ menuState, setMenuState }: SidebarProps) {
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
									key={i}
									id={i}
									title={menu}
									isActive={i === 0}
									isSelect={menuState === i}
									setMenuState={setMenuState}
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

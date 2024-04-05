import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogOverlay,
	Input,
	Select,
	useDisclosure,
} from "@chakra-ui/react"
import { Plus } from "phosphor-react"
import { useRef, useState } from "react"
import { FlowProps, MenuProps } from ".."

interface CreateMenuDialogProps {
	flow: FlowProps | undefined
	addMenuNode(menuNode: MenuProps): void
}

export function CreateMenuDialog({ addMenuNode, flow }: CreateMenuDialogProps) {
	const [selectMenuId, setSelectMenuId] = useState<string | undefined>()
	const [menuTitle, setMenuTitle] = useState<string | undefined>()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const cancelRef = useRef()

	function createMenu() {
		const randNum = Math.floor(Math.random() * 100) + 50
		if (!selectMenuId) return
		if (!menuTitle) return
		addMenuNode({
			id: `${randNum}`,
			title: menuTitle,
			parentId: selectMenuId,
		})
		onClose()
	}

	return (
		<>
			<button
				onClick={onOpen}
				className="p-3 bg-green-600 rounded-md absolute top-4 right-4 text-white hover:bg-opacity-90 z-10"
			>
				<Plus size={24} weight="bold" />
			</button>
			<AlertDialog
				motionPreset="slideInBottom"
				leastDestructiveRef={cancelRef as any}
				onClose={onClose}
				isOpen={isOpen}
				isCentered
			>
				<AlertDialogOverlay />

				<AlertDialogContent>
					<AlertDialogHeader>Adicionar menu</AlertDialogHeader>
					<AlertDialogCloseButton />
					<AlertDialogBody className="flex flex-col gap-6 py-2">
						<Input onChange={(e) => {setMenuTitle(e.target.value)}} placeholder="Título do menu"/>
						<Select placeholder='Select option' onChange={(e) => setSelectMenuId(e.target.value)}>
							{flow?.menus?.map((menu) => (
								<option key={menu.id} value={menu.id}>
									{menu.title}
								</option>
							))}
						</Select>
						<button
							className="bg-green-600 text-white font-bold px-3 py-2 rounded-md"
							onClick={createMenu}
						>
							Adicionar menu
						</button>
					</AlertDialogBody>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}

import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogOverlay,
	useDisclosure,
} from "@chakra-ui/react"
import { Plus } from "phosphor-react"
import { useRef } from "react"
import { MenuProps } from ".."

interface CreateMenuDialogProps {
	addMenuNode(menuNode: MenuProps): void
}

export function CreateMenuDialog({ addMenuNode }: CreateMenuDialogProps) {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const cancelRef = useRef()

	function createMenu() {
		const randNum = Math.floor(Math.random() * 100)
		addMenuNode({
			id: `${randNum}`,
			title: `Menu ${randNum}`,
			parentId: "7",
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
					<AlertDialogBody>
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

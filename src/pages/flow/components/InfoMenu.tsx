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
import { useEffect, useRef } from "react"
import { MenuProps } from ".."

export interface InfoMenuDialogProps {
	menu: MenuProps | undefined
	open: boolean | undefined
}

interface InfoMenuDialog {
	menu: MenuProps | undefined
	open: boolean | undefined
	closeInfoMenu(): void
}

export function InfoMenuDialog({ menu, open, closeInfoMenu }: InfoMenuDialog) {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const cancelRef = useRef()

	useEffect(() => {
		if (open) {
			onOpen()
		} else {
			onClose()
		}
	}, [open])

	function close() {
		closeInfoMenu()
		onClose()
	}
	console.log("open menu", menu)

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
				onClose={close}
				isOpen={isOpen}
				isCentered
			>
				<AlertDialogOverlay />

				<AlertDialogContent>
					<AlertDialogHeader>Informações do menu</AlertDialogHeader>
					<div className="w-full flex flex-col items-center gap-3">
						<p>
							<strong>Título: </strong>
							{menu?.title}
						</p>
						<p>
							<strong>Tipo: </strong>
							{menu?.type === "menu" ? "Menu" : "Opção"}
						</p>
					</div>
					<AlertDialogCloseButton />
					<AlertDialogBody className="flex flex-col gap-6 py-2"></AlertDialogBody>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}

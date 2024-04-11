import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	useDisclosure,
} from "@chakra-ui/react"
import { Plus } from "phosphor-react"
import { useEffect, useRef } from "react"
import { FlowProps, MenuProps } from ".."
import { EditMenuDialog } from "./EditMenu"

export interface InfoMenuDialogProps {
	menu: MenuProps | undefined
	open: boolean | undefined
}

interface InfoMenuDialog {
	menu: MenuProps | undefined
	open: boolean | undefined
	closeInfoMenu(): void
	flow: FlowProps | undefined
}

export function InfoMenuDialog({ menu, open, closeInfoMenu, flow }: InfoMenuDialog) {
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
					<AlertDialogHeader>Informações do menu ou opção</AlertDialogHeader>
					<div className="w-full flex flex-col items-center gap-3">
						<p>
							<strong>Título: </strong>
							{menu?.title}
						</p>
						<p>
							<strong>Tipo: </strong>
							{menu?.type === "menu" ? "Menu" : "Opção"}
						</p>
						<div className="flex flex-col items-center gap-2 mt-6">
							<strong>Conteúdo da mensagem: </strong>
							<p className="text-justify">{menu?.content}</p>
						</div>
					</div>
					<AlertDialogCloseButton />
					<AlertDialogBody className="flex flex-col gap-6 py-2">
						<AlertDialogFooter>
							<EditMenuDialog menu={menu!} flow={flow} />
							{/* <div
								title="Excluir menu"
								onClick={() => {
									deleteOption(menu!)
									close()
								}}
								className="cursor-pointer"
							>
								<Trash size={28} className="text-red-300" weight="fill" />
							</div> */}
						</AlertDialogFooter>
					</AlertDialogBody>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}

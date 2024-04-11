import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
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
	editMenu(menu: MenuProps): void
}

export function InfoMenuDialog({ menu, open, closeInfoMenu, flow, editMenu }: InfoMenuDialog) {
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

	const qntMenus = Object.keys(menu?.nums || {})
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
					<AlertDialogHeader className="px-10 flex justify-between items-center">
						<p>Informações do menu ou opção</p>{" "}
						<div className="flex gap-3 items-center">
							<EditMenuDialog menu={menu!} flow={flow} editMenu={editMenu} />
							{/* <AlertDialogCloseButton /> */}
						</div>
					</AlertDialogHeader>
					<div className="w-full flex flex-col items-center gap-3">
						<p>
							<strong>Título: </strong>
							{menu?.title}
						</p>
						<p>
							<strong>Tipo: </strong>
							{menu?.type === "menu" ? "Menu" : "Opção"}
						</p>
						{qntMenus.map((nMn) => {
							if (menu?.type === "option") return
							if (!menu?.nums) return
							const menuId = menu?.nums[nMn]
							const thisMenu = flow?.menus?.find((m) => m.id === menuId)
							if (!thisMenu) return
							return (
								<div key={nMn} className="flex	 items-center gap-2">
									<strong>Opção {nMn}: </strong>
									<p className="text-justify">{thisMenu?.title}</p>
								</div>
							)
						})}
						<div className="flex flex-col items-center gap-2 mt-6">
							<strong>Conteúdo da mensagem: </strong>
							<p className="text-justify">{menu?.content}</p>
						</div>
					</div>
					<AlertDialogBody className="flex flex-col gap-6 py-2">
						{/* <AlertDialogFooter>
							<div
								title="Excluir menu"
								onClick={() => {
									deleteOption(menu!)
									close()
								}}
								className="cursor-pointer"
							>
								<Trash size={28} className="text-red-300" weight="fill" />
							</div>
						</AlertDialogFooter> */}
					</AlertDialogBody>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}

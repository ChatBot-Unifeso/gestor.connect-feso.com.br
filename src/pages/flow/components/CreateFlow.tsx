import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogOverlay,
	Input,
	useDisclosure,
} from "@chakra-ui/react"
import { useRef, useState } from "react"
import { FlowProps } from ".."

interface CreateMenuDialogProps {
	addFlow(flow: FlowProps): void
}

export function CreateFlowDialog({ addFlow }: CreateMenuDialogProps) {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const cancelRef = useRef()

	const [menuTitle, setFlowTitle] = useState<string | undefined>()

	function createMenu() {
		const randNum = Math.floor(Math.random() * 100) + 50
		if (!menuTitle) return
		addFlow({
			id: `id-${randNum}`,
			title: menuTitle,
		})
	}

	return (
		<>
			<button
				onClick={onOpen}
				className="py-2 px-2 bg-[#327D6B] font-bold rounded-md text-white hover:bg-opacity-90 z-10"
			>
				Novo Flow
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
					<AlertDialogHeader>Adicionar novo flow</AlertDialogHeader>
					<AlertDialogCloseButton />
					<AlertDialogBody className="flex flex-col gap-6 py-2">
						<Input
							onChange={(e) => {
								setFlowTitle(e.target.value)
							}}
							placeholder="Título do flow"
						/>
						<button
							className="bg-green-600 text-white font-bold px-3 py-2 rounded-md"
							onClick={createMenu}
						>
							Adicionar flow
						</button>
					</AlertDialogBody>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}

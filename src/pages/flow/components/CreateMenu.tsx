import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogOverlay,
	Input,
	Radio,
	RadioGroup,
	Select,
	Stack,
	Textarea,
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
	const { isOpen, onOpen, onClose } = useDisclosure()
	const cancelRef = useRef()

	const [selectMenuId, setSelectMenuId] = useState<string | undefined>()
	const [menuTitle, setMenuTitle] = useState<string | undefined>()
	const [menuType, setMenuType] = useState<"menu" | "option">()
	const [menuContent, setMenuContent] = useState<string | undefined>()

	function createMenu() {
		const randNum = Math.floor(Math.random() * 100) + 50
		if (!menuTitle) return alert("Título do menu não pode ser vazio")
		if (!menuType) return alert("Tipo do menu não pode ser vazio")
		if (!menuContent) return alert("Conteúdo do menu não pode ser vazio")
		const error: any = addMenuNode({
			id: `${randNum}`,
			title: menuTitle,
			parentId: selectMenuId,
			type: menuType,
			content: menuContent,
		})
		if (error instanceof Error) {
			alert(error.message)
		} else {
			onClose()
		}
	}

	const flowMenus = flow?.menus?.filter((menu) => menu.type === "menu")

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
						<Input
							onChange={(e) => {
								setMenuTitle(e.target.value)
							}}
							placeholder="Título do menu"
						/>
						<RadioGroup onChange={(e: "option" | "menu") => setMenuType(e)}>
							<Stack direction="column">
								<Radio value="option" defaultChecked={true}>
									Opção de texto
								</Radio>
								<Radio value="menu">Menu</Radio>
							</Stack>
						</RadioGroup>
						<Select
							placeholder="Selecione o menu pai"
							onChange={(e) => setSelectMenuId(e.target.value)}
						>
							{flowMenus?.map((menu) => (
								<option key={menu.id} value={menu.id}>
									{menu.title}
								</option>
							))}
						</Select>
						<Textarea
							placeholder="Escreva sua mensagem"
							onChange={(e) => setMenuContent(e.target.value)}
						/>
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

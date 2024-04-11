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

interface EditMenuDialogProps {
	flow: FlowProps | undefined
	menu: MenuProps
}

export function EditMenuDialog({ flow, menu }: EditMenuDialogProps) {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const cancelRef = useRef()

	//const [selectMenuId, setSelectMenuId] = useState<string | undefined>()
	const [menuTitle, setMenuTitle] = useState<string | undefined>()
	const [menuType, setMenuType] = useState<"menu" | "option">()
	const [menuContent, setMenuContent] = useState<string | undefined>()

	function createMenu() {
		const randNum = Math.floor(Math.random() * 100) + 50
		if (!menuTitle) return alert("Título do menu não pode ser vazio")
		if (!menuType) return alert("Tipo do menu não pode ser vazio")
		if (!menuContent) return alert("Conteúdo do menu não pode ser vazio")

		onClose()
	}

	//const flowMenus = flow?.menus?.filter((menu) => menu.type === "menu")
	const flowTree = flow?.flowTree || {}
	const childrens = flowTree[menu.id] || []

	return (
		<>
			<button
				onClick={onOpen}
				className="p-3 bg-green-600 rounded-md text-white hover:bg-opacity-90 z-10"
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
					<AlertDialogHeader>Adicionar menu ou opção</AlertDialogHeader>
					<AlertDialogCloseButton />
					<AlertDialogBody className="flex flex-col gap-6 py-2">
						<Input
							defaultValue={menu.title}
							onChange={(e) => {
								setMenuTitle(e.target.value)
							}}
							placeholder="Título"
						/>
						<RadioGroup
							onChange={(e: "option" | "menu") => setMenuType(e)}
							defaultChecked
						>
							<Stack direction="column">
								<Radio value="option" defaultChecked={menu.type === "option"}>
									Apenas mensagem
								</Radio>
								<Radio value="menu" defaultChecked={menu.type === "menu"}>
									Navegação
								</Radio>
							</Stack>
						</RadioGroup>
						{/* <Select
							placeholder="Selecione o menu pai"
							onChange={(e) => setSelectMenuId(e.target.value)}
						>
							{flowMenus?.map((menu) => (
								<option key={menu.id} value={menu.id}>
									{menu.title}
								</option>
							))}
						</Select> */}
						<Textarea
							placeholder="Escreva sua mensagem"
							onChange={(e) => setMenuContent(e.target.value)}
							defaultValue={menu.content}
						/>
						{childrens.map((child, i) => (
							<div className="flex gap-2 items-center">
								<span key={child}>{i + 1}:</span>
								<Select placeholder="Selecione a opção">
									{childrens?.map((child) => (
										<option key={child} value={child}>
											{child}
										</option>
									))}
								</Select>
							</div>
						))}
						<button
							className="bg-green-600 text-white font-bold px-3 py-2 rounded-md"
							onClick={createMenu}
						>
							Adicionar menu ou opção
						</button>
					</AlertDialogBody>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}

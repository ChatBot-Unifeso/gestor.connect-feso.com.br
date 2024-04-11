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
import { Pencil } from "phosphor-react"
import { useEffect, useRef, useState } from "react"
import { FlowProps, MenuProps } from ".."

interface EditMenuDialogProps {
	flow: FlowProps | undefined
	menu: MenuProps
	editMenu(menu: MenuProps): void
}

interface NumMenus {
	[key: string]: string
}

export function EditMenuDialog({ flow, menu, editMenu }: EditMenuDialogProps) {
	const [numMenus, setNumMenus] = useState<NumMenus | undefined>()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const cancelRef = useRef()

	//const [selectMenuId, setSelectMenuId] = useState<string | undefined>()
	const [menuTitle, setMenuTitle] = useState<string | undefined>()
	const [menuType, setMenuType] = useState<"menu" | "option">()
	const [menuContent, setMenuContent] = useState<string | undefined>()

	function saveChanges() {
		if (!menuTitle) return alert("Título do menu não pode ser vazio")
		if (!menuType) return alert("Tipo do menu não pode ser vazio")
		if (!menuContent) return alert("Conteúdo do menu não pode ser vazio")

		editMenu({
			...menu,
			title: menuTitle,
			type: menuType,
			content: menuContent,
			nums: numMenus,
		})

		onClose()
	}

	//const flowMenus = flow?.menus?.filter((menu) => menu.type === "menu")
	const flowTree = flow?.flowTree || {}
	const childrens = flowTree[menu.id] || []
	const options = flow?.menus?.filter((menu) => childrens.includes(menu.id))

	useEffect(() => {
		if (menu.nums) {
			setNumMenus(menu.nums)
		}
		setMenuTitle(menu.title)
		setMenuType(menu.type)
		setMenuContent(menu.content)
	}, [])

	return (
		<>
			<button
				onClick={onOpen}
				className="p-2 bg-green-600 rounded-md text-white hover:bg-opacity-90 z-10"
			>
				<Pencil size={16} weight="bold" />
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
							defaultValue={menu.type}
						>
							<Stack direction="column" defaultChecked>
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
						{menu.type === "menu" &&
							childrens.map((child, i) => (
								<div className="flex gap-2 items-center">
									<span key={child}>{i + 1}:</span>
									<Select
										placeholder="Selecione a opção"
										onChange={(e) => {
											setNumMenus({
												...numMenus,
												[String(i + 1)]: e.target.value,
											})
										}}
									>
										{options?.map((child) => (
											<option key={child.id} value={child.id}>
												{child.title}
											</option>
										))}
									</Select>
								</div>
							))}
						<button
							className="bg-green-600 text-white font-bold px-3 py-2 rounded-md"
							onClick={saveChanges}
						>
							Salvar
						</button>
					</AlertDialogBody>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}

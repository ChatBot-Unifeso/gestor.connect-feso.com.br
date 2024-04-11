import { FlowProps, MenuProps } from "src/pages/flow"

enum Actions {
	Navigation = "navigation",
	Message = "message",
}

interface Option {
	id_option: string
	title: string
	id_next_menu: string | null
	id_menu: string
	number: number
	message: string
	action: Actions
}

interface Menu {
	id_menu: string
	title: string
	initFlow: boolean
	options: Option[]
}

export const testMenus: Menu[] = [
	{
		id_menu: "96d4c86e-3ef2-48a6-8f27-e26dc0d3dc46",
		title: "Menu Inicial",
		initFlow: true,
		options: [
			{
				id_option: "77f95cbb-9260-4d6e-a36d-65439c64d28b",
				id_next_menu: null,
				id_menu: "96d4c86e-3ef2-48a6-8f27-e26dc0d3dc46",
				title: "Opção 1",
				number: 1,
				message: "Teste",
				action: Actions.Message,
			},
			{
				id_option: "ec991a15-bade-40ba-9d04-1a9fd663f469",
				id_next_menu: "1ae2d3de-5e64-4c1c-ac8c-6020df63cfcf",
				id_menu: "96d4c86e-3ef2-48a6-8f27-e26dc0d3dc46",
				title: "Opção 2",
				number: 2,
				message: "Teste",
				action: Actions.Navigation,
			},
		],
	},
	{
		id_menu: "1ae2d3de-5e64-4c1c-ac8c-6020df63cfcf",
		title: "Menu secundario",
		initFlow: false,
		options: [],
	},
]

export function convertToFlow(menus: Menu[]): FlowProps {
	const flow: FlowProps = {} as FlowProps
	flow.id = "1"
	flow.title = "Menu 1"

	const root = menus.filter((menu) => menu.initFlow)
	if (root.length > 1) {
		throw new Error("Multiple root menus")
	}

	const navigations: Option[] = []
	const navigationMenus: MenuProps[] = []
	const options: MenuProps[] = []

	const rootMenu: MenuProps = {
		content: "",
		id: root[0].id_menu,
		title: root[0].title,
		type: "menu",
		nums: {},
	}

	root[0].options.forEach((option) => {
		const newOption: MenuProps = {} as MenuProps
		newOption.id = option.id_option
		newOption.title = option.title
		newOption.type = option.action === Actions.Navigation ? "menu" : "option"
		newOption.parentId = option.id_menu
		newOption.content = option.message
		newOption.nums = {}

		rootMenu.nums![String(option.number)] = option.id_option

		if (option.action === Actions.Navigation) {
			navigations.push(option)
			navigationMenus.push(newOption)
		} else {
			options.push(newOption)
		}
	})

	const noRootMenus = menus.filter((menu) => !menu.initFlow)
	const otherMenus: MenuProps[] = []

	noRootMenus.forEach((menu) => {
		let parentId = ""
		navigations.forEach((nav) => {
			if (nav.id_next_menu === menu.id_menu) {
				parentId = nav.id_option
				navigationMenus.forEach((navMenu) => {
					if (navMenu.id === nav.id_option) {
						const numsLength = Object.keys(navMenu.nums!).length
						navMenu.nums![String(numsLength + 1)] = menu.id_menu
					}
				})
			}
		})

		if (parentId === "") {
			throw new Error("No parent found")
		}

		const newMenu: MenuProps = {} as MenuProps
		newMenu.id = menu.id_menu
		newMenu.title = menu.title
		newMenu.type = "menu"
		newMenu.parentId = parentId
		newMenu.content = ""
		newMenu.nums = {}

		menu.options.forEach((option) => {
			const newOption: MenuProps = {} as MenuProps
			newOption.id = option.id_option
			newOption.title = option.title
			newOption.type = option.action === Actions.Navigation ? "menu" : "option"
			newOption.parentId = option.id_menu
			newOption.content = option.message
			newOption.nums = {}

			newMenu.nums![String(option.number)] = option.id_option

			if (option.action === Actions.Navigation) {
				navigations.push(option)
				navigationMenus.push(newOption)
			} else {
				options.push(newOption)
			}
		})

		otherMenus.push(newMenu)
	})

	flow.menus = [rootMenu, ...navigationMenus, ...options, ...otherMenus]
	return flow
}

// const flow = convertToFlow(testMenus)
// console.log(flow)

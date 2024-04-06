import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { ReactFlowProvider } from "reactflow"
import { Flow } from "./pages/flow"
import { Login } from "./pages/login"

const router = createBrowserRouter([
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/flow",
		element: (
			<ReactFlowProvider>
				<Flow />
			</ReactFlowProvider>
		),
	},
	{
		path: "/",
		element: <Login />,
	},
])

function App() {
	return <RouterProvider router={router} />
}

export default App

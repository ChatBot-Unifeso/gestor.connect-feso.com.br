export const Sidebar = () => {
  return (
    <aside className="w-1/5 h-screen bg-emerald-800">
      <div className="w-full h-20 bg-emerald-600 flex justify-center items-center">
        <h1>Logo</h1>
      </div>
      <nav className="w-full h-full">
        <ul className="w-full h-full flex-col flex items-center justify-center">
          <li className="w-full h-20 flex justify-center items-center">
            <a href="#" className="text-white">
              Dashboard
            </a>
          </li>
          <li className="w-full h-20 flex justify-center items-center">
            <a href="#" className="text-white">
              Flow
            </a>
          </li>
          <li className="w-full h-20 flex justify-center items-center">
            <a href="#" className="text-white">
              Manage Flow
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

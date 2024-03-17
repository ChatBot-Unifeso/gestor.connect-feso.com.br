import ReactFlow from 'reactflow'
import { ManageFlow } from '../manage-flow'
import { Sidebar } from '../sidebar'

export const Flow = () => {
  return (
    <main className="w-full h-screen flex justify-center items-center ">
      <Sidebar />
      <section className="w-[80%] h-screen flex justify-between items-center border-1 border-zinc-400">
        <ManageFlow />
      </section>
    </main>
  )
}

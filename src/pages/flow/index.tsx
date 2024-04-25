import { useCallback, useEffect, useState } from 'react'
import ReactFlow, {
  Background,
  Controls,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  Node as NodeRF,
  NodeToolbar,
  Panel,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useEdgesState,
  useNodesState,
} from 'reactflow'
import { convertToFlow, testMenus } from '../../api/convertion'
import { ManageFlow } from '../manage-flow'
import { Sidebar } from '../sidebar'
import { ButtonFlow } from './components/ButtonCreateMenu'
import { InfoMenuDialog, InfoMenuDialogProps } from './components/InfoMenu'
import { FlowService } from './flow.service'
import { Plus } from 'phosphor-react'
import { ModalFlow } from './components/modal'
import { CreateOptionNode } from './components/CreateOptionNode'
import { refreshFlowAtom, selectedMenuAtom, selectedOptionAtom } from '../../atoms'
import { useAtom } from 'jotai'
import { MenuRequest } from 'src/@types/menu'

const nodeTypes = {
  createOption: CreateOptionNode as any,
}

export const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [isOpenCreateMenu, setIsOpenCreateMenu] = useState(false)
  const [isOpenCreateOption, setIsOpenCreateOption] = useState(false)
  const [isOpenUpdateMenu, setIsOpenUpdateMenu] = useState(false)
  const [isOpenUpdateOption, setIsOpenUpdateOption] = useState(false)
  const [refreshFlow] = useAtom(refreshFlowAtom)
  const [_, setSelectedMenu] = useAtom(selectedMenuAtom)
  const [__, setSelectedOption] = useAtom(selectedOptionAtom) 


  const { convertToFlow } = FlowService({ setNodes, setEdges })

  useEffect(() => {
    convertToFlow({ setIsOpenCreateOption })
  }, [refreshFlow])

  return (
    <div className="flex w-screen h-screen">
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={(_, node) => {
          if (node.type === 'createOption') {}
          if (node.data.type === 'group') {
            const data = node.data as MenuRequest
            setSelectedMenu(data)
            setIsOpenUpdateMenu(true)
          }
          if (node.type === 'default') {
            const data = node.data as any
            setSelectedOption(data)
            setIsOpenUpdateOption(true)
          }
        }}
        fitView={true}
      >
        <Panel position="top-right">
          <ButtonFlow
            onClick={() => setIsOpenCreateMenu(true)}
            Icon={Plus}
            color="emerald"
          />
        </Panel>
        <Sidebar />
        <ModalFlow
          isOpenCreateMenu={isOpenCreateMenu}
          onCloseCreateMenu={() => setIsOpenCreateMenu(false)}
          isOpenCreateOption={isOpenCreateOption}
          onCloseCreateOption={() => setIsOpenCreateOption(false)}
          isOpenUpdateMenu={isOpenUpdateMenu}
          onCloseUpdateMenu={() => setIsOpenUpdateMenu(false)}
          isOpenUpdateOption={isOpenUpdateOption}
          onCloseUpdateOption={() => setIsOpenUpdateOption(false)}
        />
        <Controls />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  )
}

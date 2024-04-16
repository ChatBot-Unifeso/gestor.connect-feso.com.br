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
import { refreshFlowAtom } from '../../atoms'
import { useAtom } from 'jotai'

const nodeTypes = {
  createOption: CreateOptionNode as any,
}

export const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [isOpenCreateMenu, setIsOpenCreateMenu] = useState(false)
  const [isOpenCreateOption, setIsOpenCreateOption] = useState(false)
  const [refreshFlow] = useAtom(refreshFlowAtom)

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
        onNodeClick={(event, node) => {
          if (node.type === 'createOption') {
          }
          console.log('click', node)
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
        />
        <Controls />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  )
}

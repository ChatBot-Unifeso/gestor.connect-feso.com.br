import { useToast } from '@chakra-ui/react'
import { CreateMenu } from './CreateMenu'
import { CreateOption } from './CreateOption'

interface ModalFlowProps {
  isOpenCreateMenu: boolean
  onCloseCreateMenu: () => void
  isOpenCreateOption: boolean
  onCloseCreateOption: () => void
}

export const ModalFlow = (props: ModalFlowProps) => {
  const toast = useToast()
  return (
    <>
      <CreateMenu
        toast={toast}
        isOpen={props.isOpenCreateMenu}
        onClose={props.onCloseCreateMenu}
      />
      <CreateOption
        isOpen={props.isOpenCreateOption}
        onClose={props.onCloseCreateOption}
      />
    </>
  )
}

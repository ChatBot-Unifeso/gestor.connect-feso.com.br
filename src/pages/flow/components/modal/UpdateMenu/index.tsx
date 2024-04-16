import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { useState } from 'react'
import { api } from '../../../../../api'
import { refreshFlowAtom } from '../../../../../atoms'
import { useAtom } from 'jotai'

interface UpdateMenuProps {
  isOpen: boolean
  onClose: () => void
  toast: any
}

export const UpdateMenu = (props: UpdateMenuProps) => {
  const { isOpen, onClose, toast } = props
  const [dataUpdateMenu, setDataUpdateMenu] = useState({
    title: '',
    initFlow: false,
  })
  const [_, setRefreshFlow] = useAtom(refreshFlowAtom)

  const submitUpdateMenu = async () => {
    try {
      await api.patch('/menu', {
        phone_bot: '00000000000',
        data_menu: dataUpdateMenu,
      })
      toast({
        title: 'Menu criado com sucesso',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      setRefreshFlow((state) => !state)
    } catch (error) {
      toast({
        title: 'Erro ao criar menu',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="white" p={4} borderRadius={4}>
        <ModalHeader>Criar Menu</ModalHeader>
        <Input
          placeholder="Nome do menu"
          onChange={(e) =>
            setDataUpdateMenu({ ...dataUpdateMenu, title: e.target.value })
          }
        />
        <Checkbox
          onChange={(e) =>
            setDataUpdateMenu({ ...dataUpdateMenu, initFlow: e.target.checked })
          }
          mt={2}
        >
          Menu inicial
        </Checkbox>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Fechar
          </Button>
          <Button colorScheme="green" onClick={submitUpdateMenu}>
            Salvar
          </Button>
          <Button colorScheme="red" onClick={submitUpdateMenu}>
            Apagar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

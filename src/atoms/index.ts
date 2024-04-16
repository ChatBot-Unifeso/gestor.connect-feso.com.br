import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const createOptionDataMenuAtom = atom({} as any)

export const refreshFlowAtom = atom(false)

export const tokenAtom = atomWithStorage('token', '')

export const isLoginAtom = atom((get) => !!get(tokenAtom))

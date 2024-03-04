import { create } from "zustand"

type userProModalStore = {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
}

export const useProModal = create<userProModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}))

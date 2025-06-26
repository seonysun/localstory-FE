import { create } from 'zustand';

type ModalType = 'confirm' | 'content' | null;

type ModalState = {
  id?: number;
  type?: ModalType;
  isOpen: boolean;
  data?: any;
  open: (type?: ModalType, data?: any, id?: number) => void;
  close: () => void;
};

export const useModalStore = create<ModalState>(set => ({
  id: 0,
  type: null,
  isOpen: false,
  data: undefined,
  open: (type, data, id) => set({ isOpen: true, type, data, id }),
  close: () => set({ isOpen: false, type: null, data: undefined, id: 0 }),
}));

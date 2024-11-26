import { router } from 'expo-router';
import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react';

interface ModalContextType {
  closeModal: () => void;
  data: any;
  setData: Dispatch<SetStateAction<any>>;
  dataUpdated: any,
  setDataUpdated: Dispatch<SetStateAction<any>>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [dataUpdated, setDataUpdated] = useState();
  const [data, setData] = useState<any>(null);
  const [dataUpdater, setDataUpdater] = useState();
  const closeModal = () => router.canDismiss() && router.dismiss();

  return (
    <ModalContext.Provider value={{ closeModal, data, setData, setDataUpdated, dataUpdated }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { product } from '../types/type';

interface PdpContextType {
  isShowPdp: boolean;
  openPdp: (productInp: product) => void;
  closePdp: () => void;
  productData: product | null ;
}

const defaultValue: PdpContextType = {
  isShowPdp: false,
  openPdp: () => {}, 
  closePdp: () => {},
  productData: {
    id: 0,
    name: '',
    categoryId: 0,
    discount: 0,
    image: '',
    isWithHami: false,
    isSpecial: false,
    price: 0
  }
};

const PdpContext = createContext(defaultValue);

interface PdpProviderProps {
  children: ReactNode;
}

export function PdpProvider({ children }: PdpProviderProps) {
  const [isShowPdp, setIsShowPdp] = useState<boolean>(false);
  const [productData, setProductData] = useState<product | null>(null)

  const openPdp = (product: product) => {
    setIsShowPdp(true);
    setProductData(product)
  }
  const closePdp = () => setIsShowPdp(false);

  const value = {
    isShowPdp,
    openPdp,
    closePdp,
    productData
  };

  return <PdpContext.Provider value={value}>{children}</PdpContext.Provider>;
}

export function usePdp(): PdpContextType {
  const context = useContext(PdpContext);
  if (context === undefined) {
    throw new Error('usePdp must be used within a PdpProvider');
  }
  return context;
}
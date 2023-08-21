import { createContext, useContext } from 'react';
import RootStore from './RootStore';

export const RootStoreContext = createContext<RootStore | null>(null);

export function useRootStore() {
  const context = useContext(RootStoreContext);
  if (!context) {
    throw new Error('useRootStore must be used within a RootStoreProvider');
  }
  return context;
}
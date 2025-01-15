import { useContext } from 'react';

import { PresupuestoContext } from '@/context/PresupuestoContex';

export const usePresupuesto = () => {
  const context = useContext(PresupuestoContext);
  if (!context) {
    throw new Error('usePresupuesto debe estar dentro del presupuestoProvider');
  }
  return context;
}
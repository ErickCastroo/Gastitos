import { useReducer, createContext, Dispatch, ReactNode, useMemo } from 'react';

import { presupuestoReducer, EstadoInicial, PresupuestoState, PresupuestoAction } from '@/reducers/presupuestoReducer';

type PresupuestoContextProps = {
  state: PresupuestoState
  dispatch: Dispatch<PresupuestoAction>
  totalGastado: number
  disponible: number
}

type PresupuestoProviderProps = {
  children: ReactNode;
}

export const PresupuestoContext = createContext<PresupuestoContextProps>(null!)

export const PresupuestoProvider = ({children}:PresupuestoProviderProps ) => {

  const [state, dispatch] = useReducer(presupuestoReducer, EstadoInicial)

    const totalGastado = useMemo( () => state.gastos.reduce((total, gasto) => gasto.cantidad + total, 0), [state.gastos])

    const disponible = state.presupuesto - totalGastado

  return (
    <PresupuestoContext.Provider value={{ state, dispatch, totalGastado, disponible }}>
      {children}
    </PresupuestoContext.Provider>
  )
}


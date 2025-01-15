import { v4 as uuidv4} from 'uuid'

import { Categoria, DraftGasto, Gasto } from '@/types'

export type PresupuestoAction = 
{type: 'definirelPresupuesto', payload: { presupuesto: number } } | 
{type: 'mostrarModal'} |
{type: 'ocultarModal'} |  
{type: 'NuevoGasto', payload: { gasto: DraftGasto } } |
{type: 'EliminarGasto', payload: { id: Gasto['id'] } } |
{type: 'ObtenerGastoById', payload: { id: Gasto['id'] } } |
{type: 'ActualizarGasto', payload: { gasto: Gasto } } |
{type: 'ResetearApp'} |
{type : 'filtrarCategoria', payload: {id: Categoria['id'] } }

export type PresupuestoState = {
  presupuesto: number
  modal: boolean
  gastos: Gasto[],
  editingId: Gasto['id'],
  categoria: Categoria['id']
}

const PresupuestoInicial = () : number => {
  const localStoragePresupuesto = localStorage.getItem('presupuesto')
  return localStoragePresupuesto ? +localStoragePresupuesto : 0
}

const localStorageGastos = () : Gasto[] => {
  const localStorageGastos = localStorage.getItem('gastos')
  return localStorageGastos ? JSON.parse(localStorageGastos) : []
}

export const EstadoInicial: PresupuestoState = {
  presupuesto: PresupuestoInicial(),
  modal: false,
  gastos: localStorageGastos(),
  editingId: '',
  categoria: ''
}

const createGasto = (DraftGasto: DraftGasto) : Gasto => {
  return {
    id: uuidv4(),
    ...DraftGasto
  }
}

export const presupuestoReducer = (
  state: PresupuestoState = EstadoInicial,
  action: PresupuestoAction
) => {

  if (action.type === 'definirelPresupuesto') {
    return {
      ...state,
      presupuesto: action.payload.presupuesto
    }
  }

  if (action.type === 'mostrarModal') {
    return {
      ...state,
      modal: true
    }
  }

  if (action.type === 'ocultarModal') {
    return {
      ...state,
      modal: false,
      editingId: ''
    }
  }

  if (action.type === 'ResetearApp') {
    localStorage.removeItem('presupuesto');
    localStorage.removeItem('gastos');
    return {
      ...state,
      presupuesto: 0,
      gastos: [],
    };
  }

  if (action.type === 'NuevoGasto') {
    const gastos = createGasto(action.payload.gasto)

    return {
      ...state,
      gastos: [...state.gastos, gastos],
      modal: false
    }
  }

  if (action.type === 'EliminarGasto') {
    return {
      ...state,
      gastos: state.gastos.filter(gasto => gasto.id !== action.payload.id)
    }
  }

  if (action.type === 'ObtenerGastoById') {
    return {
      ...state,
      editingId: action.payload.id,
      modal: true
    }
  }

  if (action.type === 'ActualizarGasto') {
    return {
      ...state,
      gastos: state.gastos.map(gasto => gasto.id === action.payload.gasto.id ? action.payload.gasto : gasto),
      modal:false,
      editingId: ''
    }
  }

  if (action.type === 'filtrarCategoria') {
    return {
      ...state,
      categoria: action.payload.id
    }
  }

  return state
}
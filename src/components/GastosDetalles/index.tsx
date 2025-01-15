import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list'
import { useMemo } from 'react'

import { usePresupuesto } from '@/hooks/customs/usePresupuesto'

import { Gasto } from '@/types'
import { formatDate } from '@/utils'
import { categoria } from '@/data/categorias'

import { Monto } from '@/components/MontoPresupuesto'

import 'react-swipeable-list/dist/styles.css'

type GastosDetallesProps = {
  gasto: Gasto
}

function GastosDetalles({ gasto }: GastosDetallesProps) {

  const { dispatch } = usePresupuesto()

  const infoCategoria = useMemo(() => categoria.filter(cat => cat.id === gasto.categoria)[0], [gasto])

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() => dispatch({ type: 'ObtenerGastoById', payload: { id: gasto.id } })}
      >
        Actualizar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() => dispatch({ type: 'EliminarGasto', payload: { id: gasto.id } })}
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={0.6}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className='bg-white shadow-lg p-6 w-full border-b border-gray-200 flex gap-5 items-center'>
          <div>
            <img src={`/icono_${infoCategoria.icon}.svg`} alt={infoCategoria.name} className='w-20' />
          </div>

          <div className='flex-1 space-y-2'>
            <p className='text-sm font-bold uppercase text-slate-500'>{infoCategoria.name}</p>
            <p className=''>{gasto.nombre}</p>
            <p className='text-gray-500 text-sm'>{formatDate(gasto.fecha!.toString())}</p>
          </div>

          <Monto monto={gasto.cantidad} />

        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

export { GastosDetalles }
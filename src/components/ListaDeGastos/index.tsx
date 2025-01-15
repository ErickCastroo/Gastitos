import { useMemo } from 'react'

import { usePresupuesto } from '@/hooks/customs/usePresupuesto'

import { GastosDetalles } from '@/components/GastosDetalles'

function ListaDeGastos() {

  const { state } = usePresupuesto()

  const filtroGastos = state.categoria ? state.gastos.filter(gasto => gasto.categoria === state.categoria) : state.gastos

  const isEmpty = useMemo(() => filtroGastos.length === 0, [filtroGastos])

  return (
    <div className='mt-10 bg-white shadow-lg rounded-lg p-10'>
      {isEmpty ? <p className='text-gray-600 text-2xl font-bold'>No hay Gastos.</p> :(
        <>
          <p className='text-gray-600 text-2xl font-bold my-5'>Listado de Gastos.</p>
          {
            filtroGastos.map(gasto => (
              <GastosDetalles 
                key={gasto.id}
                gasto={gasto}
                
              />
            ))
          }
        </>
      )}
    </div>
  )
}

export { ListaDeGastos }
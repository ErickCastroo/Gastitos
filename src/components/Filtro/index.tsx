import { ChangeEvent } from 'react'

import { usePresupuesto } from '@/hooks/customs/usePresupuesto'

import { categoria } from '@/data/categorias'

function FiltroCategoria() {

  const { dispatch } = usePresupuesto()

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: 'filtrarCategoria',
      payload: {
        id: e.target.value
      }
    })
  }

  return (
    <div className='bg-white shadow-lg rounded-lg p-10'>
      <form>
        <div className='flex flex-col md:flex-row md:items-center gap-5'>
          <label htmlFor='categoria'>Filtrar Gastos</label>
          <select
            id='categoria'
            className='bg-slate-50 p-3 flex-1 rounded'
            onChange={handleChange}
          >
            <option value=''>Todas las Categorias</option>
            { 
              categoria.map(cat => (
                <option
                  key={cat.id}
                  value={cat.id}
                >
                  {cat.name}
                </option>
              ))
            }
          </select>
        </div>
      </form>
    </div>
  )
}

export { FiltroCategoria }
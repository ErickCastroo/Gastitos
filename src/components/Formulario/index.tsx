import { usePresupuesto } from '@/hooks/customs/usePresupuesto'

import { useState, ChangeEvent, useMemo } from 'react'

function Formulario() {

  const { dispatch } = usePresupuesto()

  const [presupuesto, setPresupuesto] = useState(0)

  const HandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPresupuesto(e.target.valueAsNumber)
  }

  const HandleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch({
      type: 'definirelPresupuesto',
      payload: { presupuesto }
    })
  }

  const EsValido = useMemo(() => {
    return isNaN(presupuesto) || presupuesto <= 0
  }, [presupuesto])

  return (
    <>
      <form
        onSubmit={HandleSubmit}
        className='space-y-5'
      >
        <div className=' flex flex-col space-y-5'>
          <label
            htmlFor='presupuesto'
            className='text-4xl text-blue-600 font-bold text-center'
          >
            Definir Presupuesto
          </label>
          <input
            type='number'
            id='presupuesto'
            name='presupuesto'
            value={presupuesto}
            onChange={HandleChange}
            placeholder='Ingresa tu presupuesto'
            className='w-full p-2 border border-gray-300 rounded-md'
          />
        </div>

        <button
          className='bg-blue-600 text-white font-bold w-full p-2 rounded-md hover:bg-blue-700 disabled:opacity-40'
          disabled={EsValido}
        >
          Definir Presupuesto
        </button>

      </form>
    </>
  )
}

export { Formulario }
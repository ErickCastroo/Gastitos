import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

import { usePresupuesto } from '@/hooks/customs/usePresupuesto'

import { Monto } from '@/components/MontoPresupuesto'

import 'react-circular-progressbar/dist/styles.css'

function RastreadorPresupuesto() {

  const { state, totalGastado, disponible, dispatch } = usePresupuesto()

  const porcentajeGastado = +((totalGastado / state.presupuesto) * 100).toFixed(2)

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
      <div className='flex justify-center'>
        <CircularProgressbar
          value={porcentajeGastado}
          styles={buildStyles({
            pathColor: porcentajeGastado ===100 ? '#DC2626' : '#3B82F6',
            trailColor: '#F5F5F5',
            textSize: '8px',
            textColor: '#3B82F6'
          })}
          text={`${porcentajeGastado}% Gastado`}
        />
      </div>

      <div className='flex flex-col justify-center items-center gab-8'>
        <button
          className='bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg'
          onClick={ () => dispatch({ type: 'ResetearApp'})}
          >
          Resetear App
        </button>

        <Monto
          label='Presupuesto'
          monto={state.presupuesto}
        />

        <Monto
          className='text-green-600'
          label='Disponible'
          monto={disponible}
        />

        <Monto
          className='text-red-600'
          label='Gastado'
          monto={totalGastado}
        />
      </div>
    </div>
  )
}

export { RastreadorPresupuesto } 
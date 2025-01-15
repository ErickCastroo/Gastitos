import { useState, FormEvent, useEffect } from 'react'
import DatePicker from 'react-date-picker'
import { toast } from 'react-toastify'

import type { DraftGasto, Value } from '@/types'

import { usePresupuesto } from '@/hooks/customs/usePresupuesto'

import { categoria } from '@/data/categorias'

import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'

function FormularioDeGastos() {
  const [gasto, setGasto] = useState<DraftGasto>({
    nombre: '',
    cantidad: 0,
    categoria: '',
    fecha: new Date()
  }) 

  const [montoPrevio, setMontoPrevio] = useState(0)

  const { dispatch, state, disponible } = usePresupuesto()

  useEffect(() => {
    if (state.editingId) {
      const editandoGasto = state.gastos.filter(currentGasto => currentGasto.id === state.editingId)[0]
      setGasto(editandoGasto)
      setMontoPrevio(editandoGasto.cantidad)
    }
  }, [state.editingId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const esCantidad = ['cantidad'].includes(name)

    setGasto({
      ...gasto,
      [name]: esCantidad ? Number(value) : value
    })
  }

  const handleChangeDate = (value: Value) => {
    setGasto({ 
      ...gasto,
      fecha: value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    //Validar el formulario 
    e.preventDefault()
    if(Object.values(gasto).includes('')) {
      toast.error('Todos los campos son obligatorios')
      return
    }

    //Validar que la cantidad sea mayor a 0
    if((gasto.cantidad - montoPrevio) > disponible) {
      toast.error('El gasto supera el presupuesto disponible')
      return
    }

    if(state.editingId) {
      //Actualizar el gasto
      dispatch({type: 'ActualizarGasto', payload: {gasto: {id: state.editingId, ...gasto}} })
      toast.success('Gasto actualizado correctamente')
      

    } else {
      //Añadir un nuevo gasto
    dispatch({ type: 'NuevoGasto', payload: { gasto } })
    toast.success('Gasto registrado correctamente')
    }
    
  }

  return (
    <form className='space-y-5' onSubmit={handleSubmit}>
      <legend className='uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2'>
        {state.editingId ? 'Editar Gasto' : 'Registrar Gasto'}
      </legend>

      <div className='flex flex-col gab-2'>
        <label
          htmlFor='nombre'
          className='text-xl font-bold'>
          Nombre Gasto:
        </label>
        <input
          type='text'
          id='nombre'
          name='nombre'
          placeholder='Añade el Nombre del gasto'
          className='bg-slate-100 p-2'
          value={gasto.nombre}
          onChange={handleChange}
        />
      </div>

      <div className='flex flex-col gab-2'>
        <label
          htmlFor='cantidad'
          className='text-xl font-bold'>
          Cantidad:
        </label>
        <input
          type='number'
          id='cantidad'
          name='cantidad'
          placeholder='Añade la cantidad del gasto: ej. 300'
          className='bg-slate-100 p-2'
          value={gasto.cantidad}
          onChange={handleChange}
        />
      </div>

      <div className='flex flex-col gab-2'>
        <label
          htmlFor='categoria'
          className='text-xl font-bold'>
          Categoria:
        </label>
        <select
          id='categoria'
          name='categoria'
          className='bg-slate-100 p-2'
          value={gasto.categoria}
          onChange={handleChange}
        >
          <option value=''>-- Selecione --</option>
          {categoria.map(categoria => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.name}
            </option>
          ))}
        </select>
      </div>
      <div className='flex flex-col gab-2'>
        <label
          htmlFor='fecha'
          className='text-xl font-bold'>
          Fecha Gasto:
        </label>
        <DatePicker
          id='fecha'
          name=''
          className='bg-slate-100 p-2 border-0'
          value={gasto.fecha}
          onChange={handleChangeDate}
        />
      </div>

      <input
        type='submit'
        className='bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg'
        value={state.editingId ? 'Guardar Cambios' : 'Registrar Gasto'}
      />
    </form>
  )
}

export { FormularioDeGastos }
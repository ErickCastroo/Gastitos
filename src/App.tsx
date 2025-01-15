import { useMemo, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'

import { usePresupuesto } from '@/hooks/customs/usePresupuesto'

import { Formulario } from '@/components/Formulario'
import { RastreadorPresupuesto } from '@/components/RastreadorPresupuesto'
import ModalDeGastos from '@/components/ModalDeGastos'
import { ListaDeGastos } from '@/components/ListaDeGastos'
import { FiltroCategoria } from '@/components/Filtro'

import 'react-toastify/dist/ReactToastify.css'

function App() {
  const { state } = usePresupuesto();

  const presupuestoDefinido = useMemo(() => state.presupuesto > 0, [state.presupuesto]);

  useEffect(() => {
    if (state.presupuesto === 0 && state.gastos.length === 0) {
      localStorage.removeItem('presupuesto');
      localStorage.removeItem('gastos');
    } else {
      localStorage.setItem('presupuesto', state.presupuesto.toString());
      localStorage.setItem('gastos', JSON.stringify(state.gastos));
    }
  }, [state]);

  return (
    <>
      <ToastContainer />
      <header className="bg-blue-600 py-5 max-h-72">
        <h1 className="text-white text-4xl font-black uppercase text-center">
          Gastitos
        </h1>
      </header>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        <p>
          {!presupuestoDefinido ? <Formulario /> : <RastreadorPresupuesto />}
        </p>
      </div>

      {presupuestoDefinido && (
        <main className="max-w-3xl mx-auto py-10">
          <FiltroCategoria />
          <ModalDeGastos />
          <ListaDeGastos />
        </main>
      )}
    </>
  );
}

export { App }

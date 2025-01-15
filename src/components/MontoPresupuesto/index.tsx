import { formatCurrency } from '@/utils'

type MontoProps = {
  label?: string
  monto: number
  className?: string;
}

function Monto({ label, monto, className }: MontoProps) {
  return (
    <p className='text-2xl text-blue-600 font-bold'>
      {label && `${label}: `}

      <span className={`text-black font-black ${className || 'text-black'}`}>
        {formatCurrency(monto)}
      </span>
    </p>
  )
}

export { Monto }
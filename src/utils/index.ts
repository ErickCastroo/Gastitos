export function formatCurrency( monto: number ) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format( monto )
}


export function formatDate( fecha: string ) : string {
  const dateObject = new Date( fecha )
  const options : Intl.DateTimeFormatOptions = {
    year: 'numeric', 
    month: 'long', 
    weekday:'long', 
    day: 'numeric' 
  }
  return Intl.DateTimeFormat('es-ES', options).format( dateObject )
}
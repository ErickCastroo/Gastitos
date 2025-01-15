export type Gasto = {
  id: string
  nombre: string
  cantidad: number
  categoria: string
  fecha: Value
};

export type DraftGasto = Omit<Gasto, 'id'>;

type ValuePiece = Date | null
export type Value = ValuePiece | [ValuePiece, ValuePiece]

export type Categoria = {
  id: string
  name: string
  icon: string
};
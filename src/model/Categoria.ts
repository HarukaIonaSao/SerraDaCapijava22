import User from "./User";

interface Categoria{
    id: number
    tipos: string
    usuario?: User | null
}

export default Categoria;
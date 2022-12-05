import Categoria from './Categoria'
import User from './User';

interface Produtos{
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    tamanho: string;
    quantidade: number;
    foto: string;
    categoria?: Categoria | null
    usuario?: User| null
}

export default Produtos;
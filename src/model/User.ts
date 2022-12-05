import Categoria from "./Categoria";
import Produtos from "./Produtos";

interface User{
    id: number;
    usuario: string;
    senha: string;
    nome: string;
    endereco: string;
    cpf: number;
    telefone: number;
    rg: number;
    foto: string
    produtos?: Produtos | null
    categoria?: Categoria | null
}

export default User;
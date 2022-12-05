import React, { ChangeEvent, useEffect, useState } from 'react'
import { Container, Typography, TextField, Button, Select, InputLabel, MenuItem, FormControl, FormHelperText } from "@material-ui/core"
import './CadastroProdutos.css';
import { useNavigate, useParams } from 'react-router-dom';
import Categoria from '../../../model/Categoria';

import Produtos from '../../../model/Produtos';
import { busca, buscaId, post, put } from '../../../service/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/TokenReduce';
import { toast } from 'react-toastify';
import User from '../../../model/User';

function CadastroProdutos() {
    let navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [categorias, setCategorias] = useState<Categoria[]>([])
    const token = useSelector<TokenState, TokenState["tokens"]>((state) => state.tokens);
    const userId = useSelector<TokenState, TokenState['id']>((state) => state.id)

    useEffect(() => {
        if (token == "") {
            toast.error("Você precisa estar logado", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,

            });
            navigate("/login");
        }
    }, [token]);


    const [categoria, setCategoria] = useState<Categoria>({
        id: 0,
        tipos: ''
    })

    const [produtos, setProdutos] = useState<Produtos>({
        id: 0,
        nome: '',
        descricao: '',
        preco: 0,
        tamanho: '',
        quantidade: 0,
        foto: "",

        categoria: null
    })

    const [usuario, setUsuario] = useState<User>({
        id: +userId,
        usuario: '',
        senha: '',
        nome: '',
        endereco: '',
        cpf: 0,
        telefone: 0,
        rg: 0,
        foto: '',
    })

    useEffect(() => {
        setProdutos({
            ...produtos,
            categoria: categoria,
            usuario: usuario
        })
    }, [categoria])

    useEffect(() => {
        getCategoria()
        if (id !== undefined) {
            findByIdProdutos(id)
        }
    }, [id])

    async function getCategoria() {
        await busca("/categoria", setCategorias, {
            headers: {
                'Authorization': token
            }
        })

    }

    async function findByIdProdutos(id: string) {
        await buscaId(`produtos/${id}`, setProdutos, {
            headers: {
                'Authorization': token
            }
        })
    }

    function updatedProdutos(e: ChangeEvent<HTMLInputElement>) {
        setProdutos({
            ...produtos,
            [e.target.name]: e.target.value,
            categoria: categoria
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        if (id !== undefined) {
            put(`/produtos`, produtos, setProdutos, {
                headers: {
                    'Authorization': token
                }

            })
            toast.success("Produtos atualizados com sucesso", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,

            });
        } else {
            post(`/produtos`, produtos, setProdutos, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success("Produtos cadastrados com sucesso", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,

            });
        }

        back()

    }

    function back() {
        navigate('/produtos/all')
    }
    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit} >
                <Typography variant="h4" component="h1" align="center" className="textoForm">Cadastro de Produtos</Typography>
                <TextField value={produtos.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProdutos(e)} id="nome" label="Nome" variant="outlined" name="nome" margin="normal" required fullWidth />
                <TextField value={produtos.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProdutos(e)} id="descricao" label="Descrição" name="descricao" variant="outlined" margin="normal" required fullWidth />
                <TextField value={produtos.preco} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProdutos(e)} id="preco" label="Preço" name="preco" variant="outlined" margin="normal" required fullWidth />
                <TextField value={produtos.tamanho} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProdutos(e)} id="tamanho" label="Tamanho" name="tamanho" variant="outlined" margin="normal" required fullWidth />
                <TextField value={produtos.quantidade} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProdutos(e)} id="quantidade" label="Quantidade" name="quantidade" variant="outlined" margin="normal" required fullWidth />
                <TextField value={produtos.foto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProdutos(e)} id="foto" placeholder="Link da Foto" label="Foto" name="foto" variant="outlined" margin="normal" fullWidth />

                <FormControl >
                    <InputLabel id="demo-simple-select-helper-label">Categoria </InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e) => buscaId(`/categoria/${e.target.value}`, setCategoria, {
                            headers: {
                                'Authorization': token
                            }
                        })}>
                        {
                            categorias.map((categoria) => (<MenuItem value={categoria.id}>{categoria.tipos}</MenuItem>))
                        }
                    </Select>
                    <FormHelperText>Escolha uma categoria  para cadastrar </FormHelperText>
                    <Button type="submit" variant="contained" disabled={categoria.id === 0} className="btnFinalizar">
                        Finalizar
                    </Button>
                </FormControl>
            </form>
        </Container>
    )
}
export default CadastroProdutos;

function findByIdProdutos(id: string) {
    throw new Error('Function not implemented.');
}

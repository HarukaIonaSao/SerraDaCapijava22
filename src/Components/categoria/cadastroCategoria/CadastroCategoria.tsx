import React, { useState, useEffect, ChangeEvent } from 'react'
import { Container, Typography, TextField, Button } from "@material-ui/core"
import Categoria from '../../../model/Categoria';
import { buscaId, post, put } from '../../../service/Service';
import './CadastroCategoria.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/TokenReduce';
import { toast } from 'react-toastify';



function CadastroCategoria() {

    let navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const token = useSelector<TokenState, TokenState["tokens"]>((state) => state.tokens);
    const userId = useSelector<TokenState, TokenState['id']>((state) => state.id)


    const [categoria, setCategoria] = useState<Categoria>({
        id: 0,
        tipos: ''
    })

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

    useEffect(() => {
        if (id !== undefined) {
            findById(id);
        }
    }, [id])

    async function findById(id: string) {
        buscaId(`/categoria/${id}`, setCategoria, {
            headers: {
                'Authorization': token
            }
        })
    }

    function updatedcategoria(e: ChangeEvent<HTMLInputElement>) {

        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value,
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log("categoria" + JSON.stringify(categoria))

        if (id !== undefined) {
            console.log(categoria)
            put(`/categoria`, categoria, setCategoria, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success("Categoria atualizada com sucesso", {
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
            post(`/categoria`, categoria, setCategoria, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success("Categoria cadastrada com sucesso", {
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
        navigate('/categoria');
    }
    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h4" component="h1" align="center" className="textoForm">Formulário de cadastro Categoria</Typography>
                <TextField value={categoria.tipos} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedcategoria(e)} id="tipos" label="tipos" variant="outlined" name="tipos" margin="normal" fullWidth />
                <Button type="submit" variant="contained" className="btnFinalizar">
                    Finalizar
                </Button>
            </form>
        </Container>
    )
}

export default CadastroCategoria;
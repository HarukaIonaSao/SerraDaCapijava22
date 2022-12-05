import React, { useState, useEffect, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {

  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import "./ListaCategoria.css";
import Categoria from '../../../model/Categoria';
import { busca } from "../../../service/Service";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/TokenReduce";
import { toast } from "react-toastify";
import { Box } from '@mui/material';

function ListaCategoria() {
  let navigate = useNavigate();
  const [categoria, setCategoria] = useState<Categoria[]>([]);
  const token = useSelector<TokenState,TokenState["tokens"]>((state)=> state.tokens);
  const [categoriaBuscado, setCategoriaBuscado] = useState('')
  

  function updateBusca(event: ChangeEvent<HTMLInputElement>){
    setCategoriaBuscado(
      event.target.value
    )
  }
  async function buscaCategoria() {
    if(categoriaBuscado !== ''){
      await busca(`/categoria/tipo/${categoriaBuscado}`, setCategoria, {
        headers: {
          Authorization: token
        }
      })
    } else {
      await busca('/categoria', setCategoria, {
        headers: {
          Authorization: token
        }
      })
    }
  }



  useEffect(() => {
    if (token == "") {
      toast.error("Você precisa estar logado", {
        position:"top-right",
        autoClose:3000,
        hideProgressBar: false,
        closeOnClick:true,
        pauseOnHover:false,
        draggable:false,
        theme:"colored",
        progress: undefined,
  
      });
      navigate("/login");
    }
  }, [token]);

  async function getCategoria() {
    await busca("/categoria", setCategoria, {
      headers: {
        'Authorization': token,
      },
    });
  }

  useEffect(() => {
    getCategoria();
  }, [categoria.length]);
  return (
    <>
    <div className="group">
        <input placeholder="Procurar categoria" type="Procurar" className="input" name='busca' onChange={(event: ChangeEvent<HTMLInputElement>) => updateBusca(event)} />
        <svg className="icon" onClick={buscaCategoria} aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
      </div>

      <Box className="containerLista">

      {categoria.length === 0 && <div className="preloader-inner">
          <span className="dot"></span>
          <div className="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>}

      {categoria.map((categoria) => (
        <Box m={2}>
          <Card variant="outlined">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Categoria
              </Typography>
              <Typography variant="h5" component="h2">
                {categoria.tipos}
              </Typography>
            </CardContent>
            <CardActions>
              <Box display="flex" justifyContent="center" mb={1.5}>
                <Link
                  to={`/cadastroCategoria/${categoria.id}`}
                  className="text-decorator-none"
                >
                  <Box mx={1}>
                  <Button variant="contained" size='small' className="btnAtualizar" >
                          atualizar
                        </Button>
                  </Box>
                </Link>
                <Link to={`/deletarCategoria/${categoria.id}`} className="text-decorator-none">
                  <Box mx={1}>
                  <Button variant="contained" size='small' color="secondary" className="btnDeletar">
                          deletar
                        </Button>
                  </Box>
                </Link>
              </Box>
            </CardActions>
          </Card>
        </Box>
      ))}
      </Box>
    </>
  );
}


export default ListaCategoria;
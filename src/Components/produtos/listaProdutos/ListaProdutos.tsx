import React, { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {

  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import Produtos from "../../../model/Produtos";
import { busca } from "../../../service/Service";
import "./ListaProdutos.css";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/TokenReduce";
import { toast } from "react-toastify";
import { Box } from '@mui/material';

function ListaProdutos() {
  let navigate = useNavigate();
  const [produtos, setProdutos] = useState<Produtos[]>([]);
  const token = useSelector<TokenState, TokenState["tokens"]>((state) => state.tokens);
  const [produtoBuscado, setProdutoBuscado] = useState('')
  const userId = useSelector<TokenState, TokenState['id']>((state) => state.id)

  function updateBusca(event: ChangeEvent<HTMLInputElement>) {
    setProdutoBuscado(
      event.target.value
    )
  }
  async function buscaProduto() {
    if (produtoBuscado !== '') {
      await busca(`/produtos/nome/${produtoBuscado}`, setProdutos, {
        headers: {
          Authorization: token
        }
      })
    } else {
      await busca('/produtos', setProdutos, {
        headers: {
          Authorization: token
        }
      })
    }
  }

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

  async function getProdutos() {
    await busca("/produtos/all", setProdutos, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    getProdutos();
  }, [produtos.length]);

  return (
    <>
      <div className="group">
        <input placeholder="Procurar produto" type="Procurar" className="input" name='busca' onChange={(event: ChangeEvent<HTMLInputElement>) => updateBusca(event)} />
        <svg className="icon" onClick={buscaProduto} aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
      </div>

      <Box className="containerLista">

        {produtos.length === 0 && <div className="preloader-inner">
          <span className="dot"></span>
          <div className="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>}

        {produtos.map((produto) => (
          <div className="container">
            <div className="imageContainer1">
              <img src={produto.foto} alt="" />
            </div>
            <div className="nomeProduto"> {produto.nome} </div>
            <div className="valores">
              <div className="Produtoestoquepreco">
                <span className="preco">R$ {produto.preco}</span>
                <span className="descricao">{produto.descricao}</span>
                <span className="categoria">Categoria: {produto.categoria?.tipos}</span>
              </div>
              <button className="button">
                {" "}
                <span> - </span> <span> 0 </span> <span> + </span>
              </button>
            </div>
            <Box mx={2}>
              <Button variant="contained" className="btnComprar">
                comprar
              </Button>
            </Box>
            {produto.usuario?.id === +userId &&
              <Box display="flex" justifyContent="center" mb={1.5}>
                <Link
                  to={`/cadastroProduto/${produto.id}`}
                  className="text-decorator-none"
                >

                  <Box mx={1}>
                    <Button
                      variant="contained"
                      className="btnAtualiza"
                      size="small"
                      color="primary"
                    >
                      atualizar
                    </Button>
                  </Box>
                </Link>
                <Link
                  to={`/deletarProdutos/${produto.id}`}
                  className="text-decorator-none"
                >
                  <Box mx={1}>
                    <Button variant="contained" size='small' color="secondary" className="btnDeletar">
                      deletar
                    </Button>
                  </Box>
                </Link>
              </Box>}
            <></>
          </div>
        ))}
      </Box>

    </>
  );
}

export default ListaProdutos;
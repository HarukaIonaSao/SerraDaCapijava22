import React, { useEffect, useState } from 'react'
import {Typography, Button,Card, CardActions, CardContent } from "@material-ui/core"
import './DeletarProdutos.css';
import Produtos from '../../../model/Produtos';
import { buscaId, deleteId } from '../../../service/Service';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/TokenReduce';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';


function DeletarProdutos() {
  let navigate = useNavigate();
  const {id}= useParams<{id: string}>();
  const token = useSelector<TokenState,TokenState["tokens"]>((state)=> state.tokens);


  const [post, setPost] = useState<Produtos>();

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

    useEffect(()=>{
      if (id !== undefined) {
          findById (id);
      }
    }, [id])

    async function findById(id: string){
      buscaId(`/produtos/${id}`, setPost,{
          headers:{
              'Authorization':token
          }
      })
    }
function sim() {
  navigate('/produtos/all')

  deleteId(`/produtos/${id}`,{
    headers:{
    'Authorization':token
    }
  });
  toast.success("Categoria deletada com sucesso", {
    position:"top-right",
    autoClose:3000,
    hideProgressBar: false,
    closeOnClick:true,
    pauseOnHover:false,
    draggable:false,
    theme:"colored",
    progress: undefined,

  });
}

function nao(){
  navigate('/produtos/all')
}
    
  return (
    <>
      <Box m={2}>
        <Card variant="outlined" >
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar os Produtos:
              </Typography>
              <Typography color="textSecondary" >
              {post?.nome}
              </Typography>
            </Box>

          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
              <Box mx={2}>
              <Button onClick={sim} variant="contained" size='large' color="primary" className="btnAtualizar">
                Sim
              </Button>
              </Box>
              <Box>
              <Button  onClick={nao} variant="contained" size='large' color="secondary" className="btnDeletar">
                Não
              </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
export default DeletarProdutos;
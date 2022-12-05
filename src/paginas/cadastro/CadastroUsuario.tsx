import React, { useState, useEffect, ChangeEvent } from "react";
import { Grid, Typography, Button, TextField } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { cadastroUsuario } from "../../service/Service";
import User from '../../model/User';
import "./CadastroUsuario.css";
import { toast } from "react-toastify";
import { Box } from '@mui/material';

function CadastroUsuario() {
  let navigate = useNavigate();
  const [confirmarSenha, setConfirmarSenha] = useState<String>("");
  const [user, setUser] = useState<User>({
    id: 0,
    usuario: "",
    senha: "",
    nome: "",
    endereco: '',
    cpf: 0,
    telefone: 0,
    rg: 0,
    foto: "",
  });

  const [userResult, setUserResult] = useState<User>({
    id: 0,
    usuario: "",
    senha: "",
    nome: "",
    endereco: '',
    cpf: 0,
    telefone: 0,
    rg: 0,
    foto: "",

  });

  useEffect(() => {
    if (userResult.id !== 0) {
      navigate("/login");
    }
  }, [userResult]);

  function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  function updatedModel(e: ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }
  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    if (confirmarSenha == user.senha) {
      cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
      toast.success('Usuario cadastrado com sucesso', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
      });
    } else {
      toast.error('Dados inconsistentes. Favor verificar as informações de cadastro.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
      });
    }
  }

  const [formCadastro, setFormCadastro] = useState(true)

  const padraoSenha = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/

  const padraoEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  useEffect(() => {
    if (user.nome.length >= 2 && user.usuario.match(padraoEmail) && user.senha.match(padraoSenha)) {
      setFormCadastro(false)
    } else {
      setFormCadastro(true)
    }
  }, [user])


  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" className="fundoCadastro">
      <Grid item xs={6} className="imagem2"></Grid>
      <Grid item xs={6} alignItems="center">
        <Box padding={10} className="corFundo">
          <form onSubmit={onSubmit}>
            <Typography
              variant="h3"
              gutterBottom
              component="h3"
              align="center"
              className="textos1"
            >
              Cadastrar
            </Typography>
            <TextField
              value={user.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              id="nome"
              label="Nome"
              variant="outlined"
              name="nome"
              margin="normal"
              fullWidth
              required
            />
            <TextField
              value={user.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              id="usuario"
              label="Usuário (e-mail)"
              variant="outlined"
              name="usuario"
              margin="normal"
              fullWidth
              required
            />
            <TextField
              value={user.cpf}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              id="cpf"
              label="CPF"
              variant="outlined"
              name="cpf"
              margin="normal"
              fullWidth
              required
            />
            <TextField
              value={user.rg}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              id="rg"
              label="RG"
              variant="outlined"
              name="rg"
              margin="normal"
              fullWidth
            />
            <TextField
              value={user.endereco}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              id="endereco"
              label="Endereço"
              variant="outlined"
              name="endereco"
              margin="normal"
              fullWidth
              required
            />
            <TextField
              value={user.telefone}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              id="telefone"
              label="Telefone"
              variant="outlined"
              name="telefone"
              margin="normal"
              fullWidth
            />
            <TextField
              value={user.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              id="foto"
              label="Foto"
              variant="outlined"
              name="foto"
              margin="normal"
              fullWidth
            />
            <TextField
              value={user.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              id="senha"
              label="Senha"
              variant="outlined"
              name="senha"
              margin="normal"
              type="password"
              fullWidth
              required
            />
            <TextField
              value={confirmarSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                confirmarSenhaHandle(e)
              }
              id="confirmarsenha"
              label="Confirmar Senha"
              variant="outlined"
              name="confirmar senha"
              margin="normal"
              type="password"
              fullWidth
              required
            />
            <Box marginTop={2} alignItems="center">
              <Link to="/login" className="text-decorator-none">
                <Button
                  variant="contained"
                  className="btnCancelar"
                >
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" variant="contained" color="primary" className="btnCadastro" disabled={formCadastro}>
                Cadastrar
              </Button>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}

export default CadastroUsuario;
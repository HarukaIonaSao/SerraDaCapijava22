import React, { useState, useEffect, ChangeEvent } from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../service/Service";
import UserLogin from "../../model/UserLogin";
import "./Login.css";
import { useDispatch } from "react-redux";
import { addId, addToken } from "../../store/tokens/Action";
import { toast } from "react-toastify";
import GitHubIcon from "@mui/icons-material/GitHub";
import GitHub from "@mui/icons-material/GitHub";

function Login() {
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  let navigate = useNavigate();





  const [userLogin, setUserLogin] = useState<UserLogin>(

    {
      id: 0,
      usuario: "",
      senha: "",
      nome: "",
      endereco: '',
      cpf: 0,
      telefone: 0,
      rg: 0,
      foto: "",
      token: "",
    }
  ); 
  
  const [respUserLogin, setRespUserLogin]= useState<UserLogin>({
    id: 0,
    usuario: "",
    senha: "",
    nome: "",
    endereco: "",
    cpf: 0,
    telefone: 0,
    rg: 0,
    foto: "",
    token: "",
  });

  function updatedModel(e: ChangeEvent<HTMLInputElement>) {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
  }

  const [loginForm, setLoginForm] = useState(true);

  const padraoEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  useEffect(() => {
    if (userLogin.usuario.match(padraoEmail) && userLogin.senha.length >= 8) {
      setLoginForm(false);
    } else {
      setLoginForm(true);
    }
  }, [userLogin]);

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await login(`/usuarios/logar`, userLogin, setRespUserLogin);
      toast.success("Usuário logado com sucesso!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
      });
    } catch (error) {
      toast.error("Dados do usuário inconsistentes. Erro ao logar!", {
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
  useEffect(() => {
    if (token !== "") {
      dispatch(addToken(token));
      navigate("/home");
    }
  }, [token]);

  useEffect(() => {
    if (respUserLogin.token !== "") {
      dispatch(addToken(respUserLogin.token));
      dispatch(addId(respUserLogin.id.toString()));
      navigate("/home");
    }
  }, [respUserLogin.token]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      className="fundo"
    >
      <Grid alignItems="center" xs={6}>
        <Box padding={10} className="corFundo">

          <form className="formulario, .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline" onSubmit={onSubmit}>
            <Typography
              variant="h3"
              gutterBottom
              component="h3"
              align="center"
              className="textos1"
            >
              Entrar
            </Typography>
            <TextField
              value={userLogin.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              id="usuario"
              label="Usuário (E-mail)"
              variant="outlined"
              name="usuario"
              margin="normal"
            
              fullWidth
            />
            <TextField
              value={userLogin.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
              id="senha"
              label="Senha"
              variant="outlined"
              name="senha"
              margin="normal"
              type="password"
              fullWidth
            />
            <Box marginTop={2} textAlign="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="loginBtn"
                disabled={loginForm}
              >
                Logar
              </Button>
            </Box>
          </form>
          <Box display="flex" alignItems="center"  flexDirection="column" justifyContent="space-evenly" marginTop={2}>
            <Box marginRight={1}>
              <Typography
                className="Conta"
                variant="subtitle1"
                gutterBottom
                align="center"
              >
                Não tem uma conta?
              </Typography>
              <Link to="/cadastrousuario">
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  align="center"
                  className="cadastroBtn "
                >
                  Cadastre-se
                </Typography>
              </Link>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid xs={6} className="imagem"></Grid>
    </Grid>
  );
}

export default Login;

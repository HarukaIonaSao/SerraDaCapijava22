import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import {
  createStyles,
  alpha,
  Theme,
  makeStyles,
} from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import {Divider } from "@mui/material";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/TokenReduce";
import { addToken } from "../../../store/tokens/Action";
import { toast } from "react-toastify";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box } from '@mui/material';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  })
);
export default function Navbar() {
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  )
  let navigate = useNavigate()
  const dispatch = useDispatch()

  function goLogout(): void {
    dispatch(addToken(""))
    toast.info("Usuário deslogado com sucesso!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      theme: "colored",
      progress: undefined,
    });
    navigate("/login")
  }

  const classes = useStyles();

  var navbarComponent;

  if (token !== "") {
    navbarComponent =
      <AppBar position="static">
        <Toolbar className="barra">
          <div>
            <Link to="/home" className="text-decorator-none">
              <img src="https://imgur.com/EW50AWW.png" alt="Logotipo" height={60} />
            </Link>
          </div>
          <Box className="textos">
            <Link to="/sobre" className="text-decorator-none">
              <Box mx={1} className="cursor">
                <Typography className="typo">
                  Sobre Nós
                </Typography>
              </Box>
            </Link>
            <Divider orientation="vertical" flexItem />
            <Link to="/produtos/all" className="text-decorator-none">
              <Box mx={1} className="cursor">
                <Typography className="typo">
                  Produtos
                </Typography>
              </Box>
            </Link>
            <Divider orientation="vertical" flexItem />
            <Link to="/categoria" className="text-decorator-none">
              <Box mx={1} className="cursor">
                <Typography className="typo">
                  Categorias
                </Typography>
              </Box>
            </Link>
            <Divider orientation="vertical" flexItem />
            <Link to="/cadastroProduto" className="text-decorator-none">
              <Box mx={1} className="cursor">
                <Typography className="typo">
                  Cadastrar Produtos
                </Typography>
              </Box>
            </Link>
            <Divider orientation="vertical" flexItem />
            <Link to="/cadastroCategoria" className="text-decorator-none">
              <Box mx={1} className="cursor">
                <Typography className="typo">
                  Cadastrar Categorias
                </Typography>
              </Box>
              </Link>
              <Divider orientation="vertical" flexItem />
            <Link to="/carrinho" className="text-decorator-none">
              <Box mx={1} className="cursor">
                <img src="https://i.imgur.com/nxXesY7.png" alt="Macacode com Carrinho" height={50}/>             
              </Box>
            </Link>
            <Divider orientation="vertical" flexItem />
            <Box onClick={goLogout}>
              <Typography className="typo">
                Sair
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

  }
  return (
    <>
      {navbarComponent}
    </>

  );
}
function setToken(arg0: string) {
  throw new Error('Function not implemented.');
}
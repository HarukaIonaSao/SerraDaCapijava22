import "./Inicial.css";
import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

function Home() {


  return (
    <Grid
      container
      direction="row"
      className="fundoInicial">
      <Grid xs={6} className="grid2" direction="column">
        <Box className="textosInicial">
          <Typography className="bemVindo"><strong>SERRA DA CAPIJAVA</strong></Typography>
          <Typography className="textoInicial">Bem-vindo(a) à Serra da CapiJava, o e-commerce voltado para a preservação e visibilidade do nosso patrimônio histórico e cultural, Serra da Capivara.</Typography>
          <Typography className="textoInicial"> <strong>Visite nosso site e confira nossos repositórios e documentação  de criação do site.</strong> </Typography>
        </Box>
      </Grid>
      <Grid xs={2}>
        <img src="https://i.imgur.com/ywGOoR9.png" alt="" className="imgBemVindo" />
      </Grid>
      <Grid direction="row" xs={12} className="grid3">
        <Grid item xs={4}>
          <Card sx={{ minWidth: "1rem", maxWidth: "40rem" , minHeight:"30rem"}} >
            <CardMedia
              component="img"
              height="300"
              image="https://i.imgur.com/Mjg9Uzt.png"
              alt="E-Commerce"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" className="tituloCard">
                E-Commerce
              </Typography>
              <Typography variant="body2" color="text.secondary" className="textoCard">
              Visite nossa loja e adquira nossos produtos, em apoio ao Parque Nacional Serra da Capivara.
              </Typography>
            </CardContent>
            <CardActions className="botao">
              <Link to="/cadastroCategoria" className="text-decorator-none">
              <Button variant="contained" size='small' className="btnAtualizar" >Login</Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ minWidth: "1rem", maxWidth: "40rem" , minHeight:"30rem"}}>
            <CardMedia
              component="img"
              height="300"
              image="https://i.imgur.com/9VYLFkW.png"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" className="tituloCard">
              Front End
              </Typography>
              <Typography variant="body2" color="text.secondary">
              Confira nosso repositório de front-end, com feito em React.
              </Typography>
            </CardContent>
            <CardActions className="botao">
            <a href="https://github.com/thais4rauj0/serra-da-capijava-frontend" className="text-decorator-none">
              <Button variant="contained" size='small' className="btnAtualizar" >Acesse</Button>
              </a>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ minWidth: "1rem", maxWidth: "40rem", minHeight:"30rem"}}>
            <CardMedia
              component="img"
              height="300"
              image="https://i.imgur.com/1eUZ2Y3.png"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" className="tituloCard">
                Back End
              </Typography>
              <Typography variant="body2" color="text.secondary">
              Acesse nossa documentação de código back-end feito em Java, o qual inspirou o nome do projeto.
              </Typography>
            </CardContent>
            <CardActions className="botao">
              <a href="https://github.com/nathaliebfm/SerraDaCapijava" className="text-decorator-none">
              <Button variant="contained" size='small' className="btnAtualizar" >Acesse</Button>
              </a>
            </CardActions>
          </Card>
        </Grid>
        
      </Grid>
    </Grid>

  );
}

export default Home;

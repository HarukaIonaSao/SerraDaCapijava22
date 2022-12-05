
import React, { useEffect } from "react";
import { Button, ButtonBaseActions } from "@material-ui/core"
import "./Home.css";
import { AppBar, Avatar, Box, Card, CardActions, CardContent, CardMedia, Grid, Tab, Tabs, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TokenState } from "../../store/tokens/TokenReduce";
import { toast } from "react-toastify";
import TabProdutos from "../../Components/produtos/tabProdutos/TabProdutos";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";

function Home() {
    const navigate = useNavigate();
    const token = useSelector<TokenState, TokenState["tokens"]>((state) => state.tokens);


    useEffect(() => {
        if (token == "") {
            toast.error('Você precisa estar logado', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });
            navigate("/login")
        }
    }, [token]);

    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 4 },
    };

    const imagens = [
        <Card
            sx={{
                minHeight: "35vh",
                height: '350px',
            }}
            className="space"
        >
            <CardMedia
                component="img"
                height="140"
                image="https://i.imgur.com/JUhpDBT.jpg"
                alt="Dra. Niede Guildon"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" className="tituloCar">
                    Dra. Niede Guildon
                </Typography>
                <Typography variant="body2" className="textoCar">
                    A Serra da Capivara teve entre um dos seus pesquisadores pioneiros, uma mulher, a arqueóloga Dra. Niede Guildon, nos anos de 1970, sendo fundamental para a criação do parque de preservação anos depois.
                </Typography>
            </CardContent>
        </Card>,

        <Card
            sx={{
                minHeight: "35vh",
                height: '350px',
            }}
            className="space"
        >
            <CardMedia
                component="img"
                height="140"
                image="https://i.imgur.com/hb9t2bx.jpg"
                alt="Paisagem Serra da Capivara"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" className="tituloCar">
                    Decreto nº 83.548
                </Typography>
                <Typography variant="body2" color="text.secondary" className="textoCar">
                    O Parque Nacional da Serra da Capivara foi fundado em 1979 , pelo decreto de n° 83.548, e foi subordinado ao Instituto Chico Mendes de Conservação da Biodiversidade (ICMBio). Hoje, é reconhecido pela Unesco e Itamaraty como Patrimônio Cultural da Humanidade.
                </Typography>
            </CardContent>
        </Card>,

        <Card
            sx={{
                minHeight: "35vh",
                height: '350px',
            }}
            className="space"
        >
            <CardMedia
                component="img"
                height="140"
                image="https://i.imgur.com/J8r5IYq.jpg"
                alt="Figuras rupestres"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" className="tituloCar">
                    Sítios Arqueológicos
                </Typography>
                <Typography variant="body2" color="text.secondary" className="textoCar">
                    O Parque Nacional da Serra da Capivara conta com mais de mil sítios arqueológicos, atualmente, em que sua maioria são abertos à visitação pública.
                </Typography>
            </CardContent>
        </Card>,

        <Card
            sx={{
                minHeight: "35vh",
                height: '350px',
            }}
            className="space"
        >
            <CardMedia
                component="img"
                height="140"
                image="https://i.imgur.com/QS9zucy.jpg"
                alt="Paisagem Serra da Capivara"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" className="tituloCar">
                    Importância Socioeconômica
                </Typography>
                <Typography variant="body2" color="text.secondary" className="textoCar">
                    O Parque também tem conta com a atuação socioeconômica para a comunidade ao redor, em que uma das atrações é a confecção e venda de cerâmicas artesanais construídas pelos moradores locais.
                </Typography>
            </CardContent>
        </Card>,

        <Card
            sx={{
                minHeight: "35vh",
                height: '350px',
            }}
            className="space"
        >
            <CardMedia
                component="img"
                height="140"
                image="https://i.imgur.com/H9iUIMA.jpg"
                alt="Fóssil de crânio humano"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" className="tituloCar">
                    Fósseis
                </Typography>
                <Typography variant="body2" color="text.secondary" className="textoCar">
                    Os sítios arqueológicos são palco para descobertas importantes para a história da humanidade. Fósseis com mais de 50 mil anos, e artefatos históricos, podem ser encontrados nos diversos museus distribuídos pelo parque.
                </Typography>
            </CardContent>
        </Card>
    ];

    return (
        <>
            <Grid container direction="row" justifyContent="center" alignItems="center" className="caixa">               
                <Grid item className="banner" xs={12} >
                    
                    
                </Grid>
                <Grid xs={12} className="produtos">
                </Grid>
            </Grid>
            <TabProdutos />
            <Grid>
                <AppBar position="static" className="appbar">
                    <Tabs centered style={{ color: "C589E8" }}>
                        <Tab label="Você Sabia?" value="1" className="tab" />
                    </Tabs>
                </AppBar>

                    <Box justifyContent="center" display="flex" className="card">
                        <AliceCarousel
                            mouseTracking
                            items={imagens}
                            responsive={responsive}
                            controlsStrategy="alternate"
                            autoHeight={true}
                            infinite
                            autoPlay
                            animationDuration={4000}
                            autoPlayInterval={5000}
                        />
                    </Box>
            </Grid>
        </>
    );
}

export default Home;
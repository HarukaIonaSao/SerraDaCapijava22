import React from "react";
import InstagramIcon from '@material-ui/icons/Instagram';
import {Divider, Grid, Typography } from "@mui/material";
import "./Footer.css"
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/TokenReduce";
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import { Box } from '@mui/material';


function Footer() {
    const token = useSelector<TokenState, TokenState["tokens"]>((state) => state.tokens);

    var footerComponent;

    if (token !== "") {
        footerComponent =
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid alignItems="center" item xs={12}>
                    <Box className="box1" display="flex" justifyContent="space-evenly">
                        <Box display="flex" alignItems="center" flexDirection="column" justifyContent="space-evenly">
                            <Typography variant="body1" align="center" gutterBottom className="textos">Nossas redes:</Typography>
                            <Box display="flex" alignItems="center" justifyContent="space-evenly">
                                <a href="https://www.instagram.com/capijavageneration/" target="_blank">
                                    <InstagramIcon className="redesFooter" />
                                </a>
                                <a href="https://github.com/thais4rauj0/serra-da-capijava-frontend" target="_blank">
                                    <GitHubIcon className="redesFooter" />
                                </a>
                            </Box>
                        </Box>
                        <Divider orientation="vertical" textAlign="center" flexItem />
                        <Box display="flex" alignItems="center" flexDirection="column" justifyContent="space-evenly">
                            <Typography variant="body1" align="center" gutterBottom className="textos">Nosso contato:</Typography>
                            <Box display="flex" alignItems="center" justifyContent="space-evenly">
                                <EmailIcon className="redesFooter" />
                                <Typography variant="body1" align="center" gutterBottom className="textos"> generationgrupo2@gmail.com</Typography>

                            </Box>
                        </Box>
                    </Box>

                    <Box className="box2">
                        <Box paddingTop={1} display="flex" justifyContent="center" alignItems="center">
                            <Typography variant="subtitle2" align="center" gutterBottom className="textos" >© 2022 Copyright:</Typography>
                        </Box>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <Typography variant="subtitle2" gutterBottom className="textos" align="center">Serra da CapiJava - Grupo 2</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

    }

    return (
        <>
            {footerComponent}
        </>
    )
}

export default Footer;
import React, { useState } from 'react'
import { AppBar, Tab, Tabs, Typography } from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';
import ListaProdutos from '../listaProdutos/ListaProdutos';
import './TabProdutos.css';
import { Box } from '@mui/material';


function TabProdutos() {
  const [value, setValue] = useState('1')
  function handleChange(event: React.ChangeEvent<{}>, newValue: string) {
    setValue(newValue);
  } /*O new value armazena o valor do clique, o qual foi definido no setValue */
  return (
/*Nesse tabcontext, ao clicar em postagens ou sobre nós, ele vai definir o valor e vai redirecionar para a página escolhida*/ <>
      <TabContext value={value} >
        <AppBar position="static" className="appbar">
          <Tabs centered onChange={handleChange} style={{ color: "C589E8" }}>
          </Tabs>
        </AppBar>
        <TabPanel value="1" >
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            <ListaProdutos />
          </Box>
        </TabPanel>
      </TabContext>
    </>
  );
}
export default TabProdutos;
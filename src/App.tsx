import React from 'react';
import Navbar from './Components/estaticos/navbar/Navbar';
import Footer from './Components/estaticos/footer/Footer';
import Home from './paginas/home/Home';
import Sobre from './paginas/sobre/Sobre';
import Login from './paginas/login/Login'
import CadastroUsuario from './paginas/cadastro/CadastroUsuario';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store/Store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import ListaProdutos from './Components/produtos/listaProdutos/ListaProdutos';
import ListaCategoria from './Components/categoria/listaCategoria/ListaCategoria';
import CadastroProdutos from './Components/produtos/cadastroProdutos/CadastroProdutos';
import CadastroCategoria from './Components/categoria/cadastroCategoria/CadastroCategoria';
import DeletarCategoria from './Components/categoria/deletarCategoria/DeletarCategoria';
import DeletarProdutos from './Components/produtos/deletarProdutos/DeletarProdutos';

import Carrinho from './paginas/carrinho/Carrinho';
import Inicial from './paginas/inicial/Inicial';

function App() {
  return (
    <Provider store={store}>
       <ToastContainer/> 
         
      <Router>
      <div style={{ minHeight: "100vh" }}>
        <Navbar />
          <Routes>
          <Route path="/" element={<Inicial />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/cadastrousuario" element={<CadastroUsuario />} />
          <Route path="/produtos/all" element={<ListaProdutos />} />
          <Route path="/categoria" element={<ListaCategoria />} />
          <Route path="/cadastroProduto" element={<CadastroProdutos />} />
          <Route path="/cadastroProduto/:id" element={<CadastroProdutos/>} />
          <Route path="/cadastroCategoria" element={<CadastroCategoria/>} />
          <Route path="/cadastroCategoria/:id" element={<CadastroCategoria/>} />
          <Route path="/deletarCategoria/:id" element={<DeletarCategoria />} />
          <Route path="/deletarProdutos/:id" element={<DeletarProdutos/>}/>
          </Routes>
          </div>
        <Footer />
      </Router>
    </Provider>
  )
}

export default App;

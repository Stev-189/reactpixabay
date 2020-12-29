import React, { Component } from 'react'
import Buscador from "./components/Buscador";
import Resultado from './components/Resultado';


class App extends Component {

  state = {
    termino: '',
    imagenes: [],
    pagina:''
  }

  scroll=()=>{
    const e=document.querySelector('.jumbotron')
    e.scrollIntoView('smooth', 'start')
  }

  paginaAnterior=()=>{
    let pagina= this.state.pagina
    if(pagina ===1)return null;
    pagina-=1;
    this.setState({pagina}, ()=>{
      this.consultarApi() 
      this.scroll()})

  }

  paginaSiguiente=()=>{
    let pagina= this.state.pagina
    pagina+=1;
    this.setState({pagina}, ()=>{
      this.consultarApi()
      this.scroll()})

  }

  consultarApi=()=>{
    const termino = this.state.termino,
          pagina= this.state.pagina;
    const url= `https://pixabay.com/api/?key=19696617-677a5352ade65dc1628a42324&q=${termino}&per_page=18&page=${pagina}`
    // console.log(url);
    fetch(url)
      .then(r=>r.json())
      .then(resultado=>this.setState({imagenes: resultado.hits}))
    
  }

  datosBusqueda=(termino)=>{
    this.setState({termino, pagina: 1}, ()=>{this.consultarApi()});

  }

  render(){
    return (
      <div className="app container">
        <div className='jumbotron'>
          <p className='lead text-center'>Buscador de imagenes</p>
          <Buscador datosBusqueda={this.datosBusqueda}/>
        </div>
       {/* {this.state.termino} */}
        <div className='row justify-content-center'>
          <Resultado 
          imagenes={this.state.imagenes}
          paginaAnterior={this.paginaAnterior}
          paginaSiguiente={this.paginaSiguiente}
          />
        </div>
      </div>
    );
}
}

export default App;

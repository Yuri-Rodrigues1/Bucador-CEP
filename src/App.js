import { FiSearch } from 'react-icons/fi';
import './style.css';
import { useState } from 'react';
import api from './services/api';


function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

async function handleSearch(){
    if(input === ''){
      alert("adcione algum cep")
      return;
    }
    try{
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput("")
    }catch{
      alert("CEP invalido")
      setInput("")
    } 
  }

  return (
    <div className="container">

      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input type="text" placeholder="Digite um cep" value={input} onChange={(event) => setInput(event.target.value)}/>

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff"/>
        </button>
      </div>

     
    {Object.keys(cep).length > 0 && (
     <div className="main">
     <h2>CEP: {cep.cep}</h2>

     <span>{cep.logradouro}</span>
     <span>Complemento: {cep.complemento}</span>
     <span>{cep.bairro}</span>
     <span>{cep.localidade} - {cep.uf}</span>
   </div>
    )}  

    </div>
  );
}

export default App;

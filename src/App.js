import React, {useState,useEffect} from 'react';
import 'whatwg-fetch';

import './App.css';
import logo from './logo.svg';

function App() {

  const [data,setData] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const response = await fetch('https://jsonplaceholder.typicode.com/photos');
        const result = await response.json();
        console.log(result);
        setData(result);
        setLoading(false);
      }catch(error){
        console.error('Error fetching data: ',error);
        setLoading(false);
      }

    }
    fetchData();
  },[]);

  return (
    <div className="App">
      <header className="App-header b-primary text-white text-center py-4">
        <h1 >Bienvenidos a mi proyecto Web</h1>
        <nav className="nav nav-pills justify-content-center my-3">
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link active" href="/">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/products">Productos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">Contacto</a>
            </li>
          </ul>
        </nav>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main className="container my-5">
          <h3 className="my-4">Post desde la API</h3>
          
          <h2>Datos desde la API</h2>
        {loading ? (
          <p>Cargando Datos...</p>
        ) : (
          // contenerdo que guardara los cards 
          <div className="row">
          
            {data.slice(0, 10).map(item => ( //Mostrar los primeros 10 datos 
            // 
              <div className="col-md-4 mb-3" key={item.id}>
                <div className="card" style={{ width: '18rem' }}>
                  <img src={item.url} className="card-img-top" alt={item.title} />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">Este es un ejemplo simple de una tarjeta con imagen.</p>
                    <a href="#!" className="btn btn-outline-success">Más información</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        </main>
    </div>
  );
  
}

export default App;

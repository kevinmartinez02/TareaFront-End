import React, {useState,useEffect} from 'react';
import 'whatwg-fetch';


function Showdata() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10); // Número de elementos por página
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/posts');
          const result = await response.json();
          setData(result);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data: ', error);
          setLoading(false);
        }
      };
      fetchData();
    }, []);
  
    // Obtener los posts actuales
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
  
    // Cambiar página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    return (
      <div className="App">
        <main className="container my-5">
          <h3 className="my-4">Post desde la API</h3>
  
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Theme</th>
                <th scope="col">Content</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="2" className="text-center">Cargando Datos...</td>
                </tr>
              ) : (
                currentPosts.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.body}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
  
          {/* Paginación */}
          <nav>
            <ul className="pagination justify-content-center">
              {Array.from({ length: Math.ceil(data.length / postsPerPage) }, (_, index) => (
                <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <a onClick={() => paginate(index + 1)} href="#!" className="page-link">
                    {index + 1}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </main>
      </div>
    );
  }
  
  export default Showdata;
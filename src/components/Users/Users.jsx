import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Users.css';
import Card from '../Card/Card';
import { PacmanLoader } from "react-spinners";
import Table from 'react-bootstrap/Table';


const Users = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [bans, setBans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const nextPage = () => {
    if (hasNextPage) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (hasPrevPage) {
      setPage(page - 1);
    }
  };

  const searching = (query) => {
    setSearch(query);
    setPage(1);
  };

  const sleep = (ml) => new Promise(resolv => setTimeout(resolv, ml));

  const goPage = (e) =>{
    e.preventDefault();

    const number = Number(textInput);

    if ( number >= 1 && number <= totalPages){
      setPage(number);
      setTextInput("")
    } else{
        alert("La pagina no esta en el rango pa");
      }
  };

  const fetchbans = async () => {
    setIsLoading(true)
    try {
      
      let response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}&name=${search}`);
      let json = await response.json();
      
      
      setBans(json.results || [])
      setTotalPages(json.info?.pages || 1)

      setHasNextPage(Boolean(json.info?.next))
      setHasPrevPage(Boolean(json.info?.prev))

      await sleep(1000)

      console.log(JSON.stringify(json));
    } catch (e) {
      console.log(e);
      setBans([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchbans(true);
  }, [page, search]);

  return (
    <>
      {isLoading ? 
        <div className="spinner">
          <PacmanLoader 
            color="#fdbc4e" 
            loading={true} 
            size={25} 
          />
        </div>
      : 
      <main className="users-page">
        <div className="users-table-card">
        <Table className="table-style" hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre de usuario</th>
              <th>Contenido</th>
              <th>Imagen</th>
            </tr>
          </thead>
          <tbody>
            {
              bans.map((bans) =>{
                return(
                <tr key={bans.id}>
                  <td>{bans.id}</td>
                  <td>{bans.name}</td>
                  <td>{bans.species}</td>
                  <td><img className="user-avatar" src={bans.image} alt={bans.name} /></td>
                </tr>
                );
              })
            }

          </tbody>
        </Table>
        </div>
        <div className="pagination-controls">
          <button type="button" onClick={() => setPage(1)} disabled={page === 1 || isLoading}>
            {"<<"}
          </button>

          <form onSubmit={goPage} className="page-jump-form">
            <input
              type="number"
              min="1"
              max={totalPages}
              aria-label="Ir a la página"
              placeholder={page}
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
            <span className="pagination-count">/ {totalPages}</span>

            <button type="submit" disabled={isLoading}>Ir</button>
          </form>

          <button type="button" onClick={() => setPage(totalPages)} disabled={page === totalPages || isLoading}>
            {">>"}
          </button>

          {hasPrevPage && <button type="button" onClick={prevPage}>Anterior</button>}
          {hasNextPage && <button type="button" onClick={nextPage}>Siguiente</button>}
        </div>
        
      </main>
        }
    </>
  );
};

export default Users;
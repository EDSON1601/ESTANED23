import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import CharacterList from "./components/CharacterList";
import UseFetch from './hooks/UseFetch';
import './index.css';


const App = () => {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({});
  const [search, setSearch] = useState(['Rick']);
  
  const url = `https://rickandmortyapi.com/api/character?name=${encodeURI( search )}`;

  const {loading} = UseFetch(`https://rickandmortyapi.com/api/character?name=${encodeURI( search )}`);
  
  const fetchCharacters = (url) => {
    fetch(url)
      .then(resp => resp.json())
      .then(data =>{
        setCharacters(data.results);
        setInfo(data.info);
        })
  };

  const inputChange=(e)=>{
    return setSearch(e.target.value);
}

  const handleNextPage = () => {
    fetchCharacters(info.next);
  };

  const handlePreviousPage = () => {
    fetchCharacters(info.prev);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    fetchCharacters(url); 
  }, [url]);

return (
    <>
      <Navbar brand="Rick and Morty App" />
      <div className="containerf py-5">
        <nav>        
          <ul className="pagination justify-content-center">
            <form>
                <input
                      className="insertTxt"
                      type = "text"
                      value={ search }
                      onChange={ inputChange }
                />
            </form>
            {
              info.prev ? (
                <li className="page-item">                  
                  <button id="btn-ant" className="page-link" onClick={handlePreviousPage}>                    
                    Previous
                  </button>
                </li>
              ) : null
            }
            {
              info.next ? (
                <li className="page-item">
                  <button className="page-link" onClick={handleNextPage}>
                    Next
                  </button>
                </li>
              ) : null
            }
          </ul>
        </nav>
      </div>

      {
                loading
                ?
                    (
                        <div className='alert alert-info text-center'>
                            Loading...
                        </div>
                    )
                :
                    (
                      <CharacterList characters={characters} />
                    )
      }

      <div className="containerf pb-5">
        <nav>
          <ul className="pagination justify-content-center">
            <form>
              <input
                    className="insertTxt"
                    type = "text"
                    value={ search }
                    onChange={ inputChange }
              />
            </form>            
            {
              info.prev ? (
                <li className="page-item">
                  <button className="page-link"
                  onClick={handlePreviousPage}>
                    Previous
                  </button>
                </li>
              ) : null
            }
            {
              info.next ? (
                <li className="page-item">
                  <button className="page-link" onClick={handleNextPage}>
                    Next
                  </button>
                </li>
              ) : null
            }
          </ul>
        </nav>
      </div>
    </>
  );
}

export default App;

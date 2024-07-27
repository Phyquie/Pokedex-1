import { useEffect, useState, useCallback } from 'react';
import './App.css';
import Header from "./components/header";
import Pokemonitem from './components/pokemonitem';
import axios from 'axios';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Searchitem from './components/search/searchitem';

function App() {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=15");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false); // New state for popup visibility

  const pokeFun = useCallback(async () => {
    setLoading(true);
    const res = await axios.get(url);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    const promises = res.data.results.map(async (item) => {
      const result = await axios.get(item.url);
      return result.data;
    });
    const results = await Promise.all(promises);
    setPokeData(results);
    setLoading(false);
  }, [url]);

  const handleInfoPokemon = (poke) => {
    setPokeDex(poke);
  };

  useEffect(() => {
    pokeFun();
  }, [pokeFun]);

  const handlePrev = () => {
    setUrl(prevUrl);
    setPokeData([]);
  };

  const handleNext = () => {
    setUrl(nextUrl);
    setPokeData([]);
  };

  const [dataToDisplay, setDataToDisplay] = useState('');

  const handleDataTransfer = (inputData) => {
    setDataToDisplay(inputData);
  };

  const handlePopupOpen = () => {
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <body className="m-0 p-0 h-full w-full">
          <div className="fixed w-screen h-screen overflow-auto">
            <Header onTransfer={handleDataTransfer} />
            <div className='bg-slate-100 rounded-3xl'>
              <div className="container mx-auto p-1">
                <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0.1 text-center'>
                  <Pokemonitem
                    pokemon={pokeData}
                    loading={loading}
                    infoPokemon={handleInfoPokemon}
                    data={pokeDex}
                    onPopupOpen={handlePopupOpen} 
                    onPopupClose={handlePopupClose} 
                  />
                </div>
              </div>
              {!popupOpen && ( 
                <div className='flex justify-center p-1 space-x-32'>
                  {prevUrl && <Button variant="contained" startIcon={<ArrowBackIosIcon />} onClick={handlePrev}>
                    Prev.
                  </Button>}
                  {nextUrl && <Button variant="contained" endIcon={<ArrowForwardIosIcon />} onClick={handleNext}>
                    Next
                  </Button>}
                </div>
              )}
            </div>
          </div>
        </body>
      ),
    },
    {
      path: "/search",
      element: <Searchitem transferredData={dataToDisplay} />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

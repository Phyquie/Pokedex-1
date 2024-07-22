import { useEffect, useState, useCallback } from 'react';
import './App.css';
import Header from "./components/header"
import Pokemonitem from './components/pokemonitem';
import axios from 'axios';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import Searchitem from './components/search/searchitem';
;
function App() {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20")

  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState([]);
  

  const pokeFun = useCallback(async () => {
    setLoading(true)
    const res = await axios.get(url);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    const promises = res.data.results.map(async (item) => {
      const result = await axios.get(item.url);
      return result.data;
    });
    const results = await Promise.all(promises);
    setPokeData(results);
    setLoading(false)
  }, [url]);

  const handleInfoPokemon = (poke) => {
    setPokeDex(poke);
  }

  useEffect(() => {
    pokeFun();
  }, [pokeFun]);

  const handlePrev = () => {
    setUrl(prevUrl);
    setPokeData([]);
  }

  const handleNext = () => {
    setUrl(nextUrl);
    setPokeData([]);
  }
  const [dataToDisplay, setDataToDisplay] = useState('');

  const handleDataTransfer = (inputData) => {
    setDataToDisplay(inputData);
    
  };


  const router=createBrowserRouter([
    {
      path:"/",
      element:
      <body class="m-0 p-0 h-full w-full">
      <div className="fixed w-screen h-screen bg-yellow-200 overflow-auto">
      <Header onTransfer={handleDataTransfer}/>
      <div className="container mx-auto p-5">
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center'>
          <Pokemonitem pokemon={pokeData} loading={loading} infoPokemon={handleInfoPokemon} data={pokeDex} />
        </div>
      </div><div className='flex justify-center p-1 space-x-32'>
        {prevUrl && <Button variant="contained" startIcon={<ArrowBackIosIcon />} onClick={handlePrev}>
          Prev.
        </Button>}
        {nextUrl && <Button variant="contained" endIcon={<ArrowForwardIosIcon />} onClick={handleNext}>
          Next
        </Button>}
      </div>
    </div>
    </body>
    },
    {
      path:"/search",
      element:<Searchitem transferredData={dataToDisplay}/>
    }

  ])
 

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
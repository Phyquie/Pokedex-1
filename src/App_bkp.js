import { useEffect, useState } from 'react';
import './App.css';
import Header from "./components/header"
import Pokemonitem from './components/pokemonitem';
import axios from 'axios';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
function App() {
  const [pokeData,setPokeData]=useState([]);
  const[loading,setLoading]=useState(true);
  const[url,setUrl]=useState("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20")

  const[nextUrl,setNextUrl]=useState();
  const[prevUrl,setPrevUrl]=useState();
  const[pokeDex,setPokeDex]=useState();
 const pokeFun=async()=>{
  setLoading(true)
  const res=await axios.get(url);
  //console.log(res.data.results)
  setNextUrl(res.data.next);
  setPrevUrl(res.data.previous);
  getPokemon(res.data.results)
  setLoading(false)
  
 }
 const getPokemon=async(res)=>{
  const pokemons = await res.map(async (item)=>{
    const poke=await axios.get(item.url);
    return poke.data;
  })
  Promise.allSettled(pokemons).then(
    (results)=>{
      results = results.map(result => result.value)
      console.log(results);
      setPokeData(state=>{
        state=[results]
        state.sort((a,b)=>a.id>b.id?1: -1);
        return state;
      })
    }
  )
 }
 const handleInfoPokemon = (poke) => {
  setPokeDex(poke);
}
 useEffect(() => {
  pokeFun();
}, [url]);
  
  return (
    <div className="App">
      <Header />
      <div className="container mx-auto p-5">
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center'>
          <Pokemonitem pokemon={pokeData} loading={loading} infoPokemon={handleInfoPokemon} data={pokeDex}/>
          
        </div>
      </div><div className='flex justify-center p-1 space-x-32'>
      {prevUrl&&<Button variant="contained" startIcon={<ArrowBackIosIcon/>}onClick={()=>{
        setUrl(prevUrl)
        setPokeData([])
      }}>
  Prev.
</Button>}
<Button variant="contained" endIcon={<ArrowForwardIosIcon/>} onClick={()=>{
  setPokeData([])
  setUrl(nextUrl)
}}>
  Next
</Button>
      
      </div>
      
    </div>
  );
}

export default App;


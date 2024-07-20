import React, { useEffect, useState } from 'react';
import HeaderSearch from './searchheader';
import axios from 'axios';

import CircularProgress from '@mui/material/CircularProgress';

const Searchitem = ({ transferredData }) => {
  const [dataToDisplay, setDataToDisplay] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newdatatodisplay,setnewdatatodisplay]=useState(null)

  const newhandletransfer=(inp)=>{
    setnewdatatodisplay(inp);
    console.log(newdatatodisplay);
  
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${transferredData}`);
        
        setDataToDisplay(response.data);
      } catch (error) {
        console.error( error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchData2 = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${newdatatodisplay}`);
        
        setDataToDisplay(response.data);
      } catch (error) {
        console.error( error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

     if(newdatatodisplay!=null){
      fetchData2()
     }else{
      fetchData()
     }
  }, [transferredData,newdatatodisplay]);




  if (isLoading) {
    return (<>
    <HeaderSearch onName={newhandletransfer} /><div className='flex justify-center items-center text-center'><CircularProgress /></div></>);
  }

  if (error) {
    return (<><HeaderSearch onName={newhandletransfer}/>
    Error: {error.message}
      <br></br><p>Try rewriting a right name</p></>)
  }

  if (!dataToDisplay) {
    return <div>No data available.</div>;
  }

  const pokemonName = dataToDisplay.name;

  return (
    <>
      <HeaderSearch onName={newhandletransfer}/>
      <div className='bg-purple-900 rounded-3xl h-full my-6 flex justify-center items-center text-white text-4xl flex-col text-center md:flex-col md:flex-wrap md:text-center'>
        <div className='flex justify-center '>
          <strong className=' capitalize lg:text-9xl md:text-7xl sm:text-5xl xs:text-2xl '>{pokemonName}</strong>
        </div>
        <div className='flex justify-center'>
          <img
            src={dataToDisplay.sprites.other.home.front_default}
            alt={dataToDisplay.name}
            style={{ width: '400px', height: '400px', marginBottom: '8px' }}
          />
        </div>
        <div className='flex flex-col justify-center'>
          <p>Type: {dataToDisplay.types[0].type.name}</p>
          <p>Weight: {dataToDisplay.weight}Kg</p>
          <p>HP: {dataToDisplay.stats[0].base_stat}</p>
          <p>Attack: {dataToDisplay.stats[1].base_stat}</p>
          <p>Defence: {dataToDisplay.stats[2].base_stat}</p>
          <p>Special-Attack: {dataToDisplay.stats[3].base_stat}</p>
          <p>Special-Defence: {dataToDisplay.stats[4].base_stat}</p>
          <p>Speed: {dataToDisplay.stats[5].base_stat}</p>
        </div>
      </div>
    </>
  );
};

export default Searchitem;
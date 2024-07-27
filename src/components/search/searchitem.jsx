import React, { useEffect, useState } from 'react';
import HeaderSearch from './searchheader';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

const typeColors = {
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
  normal: '#A8A878',
};

const fadedTypeColors = {
  fire: '#F5A064',
  water: '#99B3F2',
  grass: '#9FD181',
  electric: '#FAD970',
  ice: '#B6E4E4',
  fighting: '#D36660',
  poison: '#B06CB0',
  ground: '#E8D397',
  flying: '#C1ADEF',
  psychic: '#F98BAA',
  bug: '#C2CD73',
  rock: '#CAB669',
  ghost: '#9081A8',
  dragon: '#8C6BF9',
  dark: '#908081',
  steel: '#CBCBD6',
  fairy: '#F1B0BD',
  normal: '#C2C2A9',
};

const ProgressWithLabel = ({ value, type }) => {
  const filledWidth = (value / 120) * 100;
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '24px',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: `${typeColors[type]}33`,
        marginBottom: '8px',
        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.2)',
      }}
    >
      <div
        style={{
          width: `${filledWidth}%`,
          height: '100%',
          backgroundColor: typeColors[type],
          transition: 'width 0.3s ease-in-out',
          borderRadius: 'inherit',
        }}
      />
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '14px',
          lineHeight: '24px',
        }}
      >
        {value}
      </span>
    </div>
  );
};

const Searchitem = ({ transferredData }) => {
  const [dataToDisplay, setDataToDisplay] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newdatatodisplay, setnewdatatodisplay] = useState(null);

  const newhandletransfer = (inp) => {
    setnewdatatodisplay(inp);
    console.log(inp);  // Log the updated value
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${transferredData}`
        );
        setDataToDisplay(response.data);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchData2 = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${newdatatodisplay}`
        );
        setDataToDisplay(response.data);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (newdatatodisplay != null) {
      fetchData2();
    } else {
      fetchData();
    }
  }, [transferredData, newdatatodisplay]);

  if (isLoading) {
    return (
      <>
        <HeaderSearch onName={newhandletransfer} />
        <div className="flex justify-center items-center text-center h-screen">
          <CircularProgress />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <HeaderSearch onName={newhandletransfer} />
        <div className="flex justify-center items-center text-center h-screen">
          <p className="text-red-600 font-bold">
            Error: {error.message}
            <br />
            Try entering a valid Pokémon name.
          </p>
        </div>
      </>
    );
  }

  if (!dataToDisplay) {
    return <div>No data available.</div>;
  }

  const pokemonName = dataToDisplay.name || 'Unknown';
  const primaryType = dataToDisplay.types && dataToDisplay.types[0] ? dataToDisplay.types[0].type.name : 'normal';

  return (
    <>
      <HeaderSearch onName={newhandletransfer} />
      <div
        className="rounded-3xl p-6 my-6 mx-auto max-w-2xl shadow-lg text-white"
        style={{ backgroundColor: `${fadedTypeColors[primaryType]}cc` }}
      >
        <div className="flex flex-col items-center">
          <strong className="capitalize text-5xl mb-4">{pokemonName}</strong>
          <img
            src={dataToDisplay.sprites && dataToDisplay.sprites.other && dataToDisplay.sprites.other.home ? dataToDisplay.sprites.other.home.front_default : 'placeholder_image_url'}
            alt={pokemonName}
            style={{ width: '300px', height: '300px', marginBottom: '16px' }}
          />
          <div className="w-full">
            <div className="flex justify-between mb-2">
              <span>Type:</span>
              <span>{primaryType}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Weight:</span>
              <span>{dataToDisplay.weight} Kg</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>HP:</span>
              <ProgressWithLabel
                value={dataToDisplay.stats && dataToDisplay.stats[0] ? dataToDisplay.stats[0].base_stat : 0}
                type={primaryType}
              />
            </div>
            <div className="flex justify-between mb-2">
              <span>Attack:</span>
              <ProgressWithLabel
                value={dataToDisplay.stats && dataToDisplay.stats[1] ? dataToDisplay.stats[1].base_stat : 0}
                type={primaryType}
              />
            </div>
            <div className="flex justify-between mb-2">
              <span>Defense:</span>
              <ProgressWithLabel
                value={dataToDisplay.stats && dataToDisplay.stats[2] ? dataToDisplay.stats[2].base_stat : 0}
                type={primaryType}
              />
            </div>
            <div className="flex justify-between mb-2">
              <span>Special Attack:</span>
              <ProgressWithLabel
                value={dataToDisplay.stats && dataToDisplay.stats[3] ? dataToDisplay.stats[3].base_stat : 0}
                type={primaryType}
              />
            </div>
            <div className="flex justify-between mb-2">
              <span>Special Defense:</span>
              <ProgressWithLabel
                value={dataToDisplay.stats && dataToDisplay.stats[4] ? dataToDisplay.stats[4].base_stat : 0}
                type={primaryType}
              />
            </div>
            <div className="flex justify-between mb-2">
              <span>Speed:</span>
              <ProgressWithLabel
                value={dataToDisplay.stats && dataToDisplay.stats[5] ? dataToDisplay.stats[5].base_stat : 0}
                type={primaryType}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Searchitem;

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CustomPopup from './CustomPopup'; // Import custom popup component
import CircularProgress from '@mui/material/CircularProgress';

export default function Pokemonitem({ pokemon, loading, infoPokemon, onPopupOpen, onPopupClose }) {
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
  const [open, setOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleClose = () => {
    setOpen(false);
    onPopupClose();  
  };

  const handleOpen = (item) => {
    setOpen(true);
    setSelectedPokemon(item);
    infoPokemon(item);
    onPopupOpen();  
  };

  return (
    <>
      {loading ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', 
          width: '100vw',  
        }}>
          <CircularProgress size={60} />
        </div>
      ) : (
        pokemon.map((item) => (
          <div key={item.id} className="h-50 w-50 m-10">
            <React.Fragment>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: typeColors[item.types[0].type.name],
                  borderRadius: '1.5rem',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    backgroundColor: typeColors[item.types[0].type.name], // Maintain the same color on hover
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Ensure the box shadow is consistent
                  },
                }}
                onClick={() => handleOpen(item)}
                className="rounded-3xl"
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <strong>{item.id}</strong>
                  <img
                    src={item.sprites.other.home.front_default}
                    alt={item.name}
                    style={{ width: '150px', height: '150px', marginBottom: '2px' }}
                  />
                  <strong>{item.name}</strong>
                  <p>{item.types[0].type.name}</p>
                </div>
              </Button>

              <CustomPopup
                open={open}
                onClose={handleClose}
                selectedPokemon={selectedPokemon}
              />
            </React.Fragment>
          </div>
        ))
      )}
    </>
  );
}

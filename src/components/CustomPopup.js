// CustomPopup.js
import React from 'react';
import './CustomPopup.css'; // Custom styles

const CustomPopup = ({ open, onClose, selectedPokemon }) => {
  if (!open) return null;

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

  return (
    <div className="custom-popup-overlay">
      <div className="custom-popup">
        <button className="custom-popup-close" onClick={onClose}>X</button>
        <div className="custom-popup-content ">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
         <img
            src={selectedPokemon?.sprites.other.home.front_default}
            style={{
              width: '100%',
              maxWidth: '200px',
              height: 'auto',
            }}
            alt={selectedPokemon?.name}
          /> </div>
          <strong
            className="custom-popup-title capitalize"
          >
            {selectedPokemon?.name}
          </strong>
          <div style={{ fontSize: '18px', color: '#555', display:'flex', justifyContent:'center' }}>
            <strong>Type:</strong><div className="type capitalize" style={{ color: typeColors[selectedPokemon?.types[0].type.name] }}>
            {selectedPokemon?.types[0].type.name}</div>
            
             {selectedPokemon?.types[1] &&   <div className="type capitalize" style={{ color: typeColors[selectedPokemon?.types[1].type.name] }}> <strong className='text-slate-950'>/</strong>  {selectedPokemon?.types[1].type.name}</div>}</div> 
          
             <div style={{ fontSize: '18px', color: '#555', marginTop: '10px' }}>
  <strong>Height:</strong> {selectedPokemon?.height ? (selectedPokemon.height / 10) : 'N/A'} m
</div>

          <div className="progress-bar">
            <div className="progress-bar-section">
              <span>HP:</span>
              <ProgressWithLabel value={selectedPokemon?.stats[0].base_stat} type={selectedPokemon?.types[0].type.name} />
            </div>
            <div className="progress-bar-section">
              <span>Defense:</span>
              <ProgressWithLabel value={selectedPokemon?.stats[1].base_stat} type={selectedPokemon?.types[0].type.name} />
            </div>
            <div className="progress-bar-section">
              <span>Attack:</span>
              <ProgressWithLabel value={selectedPokemon?.stats[2].base_stat} type={selectedPokemon?.types[0].type.name} />
            </div>
            <div className="progress-bar-section">
              <span>Special Attack:</span>
              <ProgressWithLabel value={selectedPokemon?.stats[3].base_stat} type={selectedPokemon?.types[0].type.name} />
            </div>
            <div className="progress-bar-section">
              <span>Speed:</span>
              <ProgressWithLabel value={selectedPokemon?.stats[5].base_stat} type={selectedPokemon?.types[0].type.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProgressWithLabel = ({ value, type }) => {
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
  
  const filledWidth = (value / 120) * 100;
  return (
    <div style={{ position: 'relative', width: '100%', height: '20px', borderRadius: '12px', overflow: 'hidden', backgroundColor: `${typeColors[type]}33` }}>
      <div
        style={{
          width: `${filledWidth}%`,
          height: '100%',
          backgroundColor: typeColors[type],
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

export default CustomPopup;

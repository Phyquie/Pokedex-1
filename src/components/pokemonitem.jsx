import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { Skeleton } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialog-paper': {
    transition: 'transform 0.3s ease-in-out'
  },
}));

export default function Pokemonitem({ pokemon, loading, infoPokemon, data }) {
  const [open, setOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {loading ? (
        <div className='flex justify-center items-center text-center'>
          <CircularProgress />
        </div>
      ) : (
        pokemon.map((item) => (
          <div key={item.id} className="h-50 w-50 m-10">
            <React.Fragment>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: 'purple',
                  borderRadius: '1.5rem',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    backgroundColor: '#8B008B',
                    boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.15)',
                  },
                }}
                onClick={() => {
                  setOpen(true);
                  setSelectedPokemon(item);
                  infoPokemon(item);
                }}
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
                    style={{ width: '150px', height: '150px', marginBottom: '8px' }}
                  />
                  <strong>{item.name}</strong>
                </div>
              </Button>
              <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                BackdropProps={{
                  style: {
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    backdropFilter: 'blur(1px)',
                  },
                }}
              >
                <DialogTitle sx={{ m: 0, p: 2, textAlign: "center" }} id="customized-dialog-title">
                  <img
                    src={selectedPokemon?.sprites.other.home.front_default}
                    style={{ width: '300px', height: '300px' }}
                    alt={selectedPokemon?.name}
                  />
                  <strong className='uppercase'>{selectedPokemon?.name}</strong>
                </DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                  <Typography gutterBottom>
                    Type: {selectedPokemon?.types[0].type.name}
                    <br />
                    Height: {selectedPokemon?.height}
                    <br />
                    Weight: {selectedPokemon?.weight}
                    <br />
                    HP: {selectedPokemon?.stats[0].base_stat}
                    <br />
                    Defense: {selectedPokemon?.stats[1].base_stat}
                    <br />
                    Attack: {selectedPokemon?.stats[2].base_stat}
                    <br />
                    Special Attack: {selectedPokemon?.stats[3].base_stat}
                    <br />
                    Speed: {selectedPokemon?.stats[5].base_stat}
                  </Typography>
                </DialogContent>
              </BootstrapDialog>
            </React.Fragment>
          </div>
        ))
      )}
    </>
  );
}

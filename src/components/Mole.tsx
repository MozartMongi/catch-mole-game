import React from 'react'
import MolePic from '../assets/mole.png'
import '../App.css';

// Mole component that displays the mole and handles the click
const Mole: React.FC<{ onClick: () => void; isVisible: boolean; onClickNoMole: () => void }> = ({ onClick, onClickNoMole, isVisible }) => {
  return (
    <div className="mole-hole">
        <div className="mole" onClick={isVisible ? onClick : onClickNoMole}>
      {isVisible && (
         <img src={MolePic} alt='mole-pic' width={60} />
        )}
        </div>
    </div>
  );
};

export default Mole
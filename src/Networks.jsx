import { useState } from "react";
import arbitrum from './assets/Blockchains/arbitrum.svg';
import arbitrumnova from './assets/Blockchains/Arbitrum-Nova.svg';
import avalanche from './assets/Blockchains/avalanche.svg'
import base from './assets/Blockchains/Base.svg'
import bnbchain from './assets/Blockchains/BNBChain.svg'
import ethereum from './assets/Blockchains/ethereum.svg'
import klaytn from './assets/Blockchains/klaytn.svg'
import optimism from './assets/Blockchains/optimism.svg'
import polygon from './assets/Blockchains/polygon.png'
import solana from './assets/Blockchains/Solana.png'
import zora from './assets/Blockchains/Zora.png'

import './Networks.css';

const options = [
    { label: 'Arbitrum', image: {arbitrum} },
    { label: 'Arbitrum Nova', image: {arbitrumnova} },
    { label: 'Avalanche', image: {avalanche} },
    { label: 'BNB Chain', image: {base} },
    { label: 'Base', image: {bnbchain} },
    { label: 'Ethereum', image: {ethereum} },
    { label: 'Klaytn', image: {klaytn} },
    { label: 'Optimism', image: {optimism} },
    { label: 'Polygon', image: {polygon} },
    { label: 'Solana', image: {solana} },
    { label: 'Zora', image: {zora} },

  ];

  const Networks = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    const selectOption = (option) => {
      setSelectedOption(option);
      setIsDropdownOpen(false);
    };

    return (
      <div className='container'>
        <h3>React Js Dropdown with Image</h3>
        <p>Selected Value: {selectedOption ? selectedOption.label : ''}</p>
        <div className="dropdown">
          <div className="dropdown-toggle" onClick={toggleDropdown}>
            {selectedOption && (
              <img src={selectedOption.image} alt={selectedOption.label} className="dropdown-option-image" />
            )}
            <span className="dropdown-option-label">
              {selectedOption ? selectedOption.label : 'Select an option'}
            </span>
            <span className="dropdown-caret"></span>
          </div>
          <ul className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
            {options.map((option, index) => (
              <li key={index} onClick={() => selectOption(option)}>
                <img src={option.image} alt={option.label} className="dropdown-option-image" />
                <span className="dropdown-option-label">{option.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  export default Networks;
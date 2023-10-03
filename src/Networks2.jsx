import { useState } from "react";
import './Networks.css'

const options = [
    { label: 'John Andrew', image: 'https://www.sarkarinaukriexams.com/images/editor/1691754246bird-g8b2ad9bcc_640.jpg' },
    { label: 'Mr. Bob', image: 'https://www.sarkarinaukriexams.com/images/editor/1691754273bird-gda5461bb5_640.jpg' },
    { label: 'Jimmy Charlie', image: 'https://www.sarkarinaukriexams.com/images/editor/1691754293lily-g661b596df_640.jpg' },
    { label: 'David', image: 'https://www.sarkarinaukriexams.com/images/editor/1691754318flower-gf39467e8f_640.jpg' },
    { label: 'Emily', image: 'https://www.sarkarinaukriexams.com/images/editor/1691754338influencer-g28b2a2f55_640.jpg' },
    { label: 'Frank', image: 'https://www.sarkarinaukriexams.com/images/post/1683451563Vue_Js_Open_link_in_new_tab.jpg' },
  ];

  const Networks2 = () => {
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

  export default Networks2;
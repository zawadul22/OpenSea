import { useState } from 'react';
import './Switch.css';

const ToggleSlider = ({id}) => {
  const [checked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked(!checked);
  };

  return (

    <div className="toggle-slider">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleToggle}
      />
      <label htmlFor={id} className="slider" />
    </div>

  );
};

export default ToggleSlider;
import React, { useEffect, useState } from 'react';

type SwitcherProps = {
  initialState?: boolean;
  onChange: (newState: boolean) => void;
  label?: string;
};
/**
 * A toggle switch component that can be used to represent an on/off state.
 * It consists of a checkbox input styled to look like a switch, and an optional label.
 * The component maintains its state internally and triggers a callback when the state changes.
 *
 * @param {SwitcherProps} props - The properties for the Switcher component.
 * @param {boolean} [props.initialState=false] - The initial state of the switch (checked or not).
 * @param {string} [props.label] - An optional label to display next to the switch.
 * @param {(newState: boolean) => void} props.onChange - A callback function that is called when the switch state changes.
 * 
 * @returns {JSX.Element} The rendered switch component.
 */

export function Switcher(props: SwitcherProps) {
  const [isChecked, setIsChecked] = useState(props.initialState);

  const handleCheckboxChange = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    if (props.onChange) {
      props.onChange(newState);
    }
  };

  useEffect(() => {
    setIsChecked(props.initialState);
  }, [props.initialState]);

  return (
    <>
      <label className='flex cursor-pointer select-none items-center'>
        <div className='relative'>
          <input
            type='checkbox'
            checked={isChecked}
            onChange={handleCheckboxChange}
            className='sr-only'
          />
          <div className='block h-8 w-14 rounded-full bg-[#E5E7EB]'></div>
          {/* Dot */}
          <div
            className={`dot absolute left-1 top-1 h-6 w-6 rounded-full transition-transform duration-200 ${
              isChecked ? 'translate-x-6 bg-white' : 'bg-black'
            }`}
          />
        </div>
        <div className='pl-3 text-gray-600'>{props.label}</div>
      </label>
    </>
  );
}

import React, { ChangeEvent } from "react";

interface RadioInputProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  selectedOption: string;
  onChange: (name: string, value: string) => void;
}

export const RadioInput = ({
  name,
  label,
  options,
  selectedOption,
  onChange,
}: RadioInputProps) => {
  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;
    onChange(name, selectedValue);
  };

  return (
    <div className="form-group mb-3">
      <label>{label}</label>
      <div>
        {options.map((option) => (
          <div key={option.value} className="form-check form-check-inline">
            <input
              type="radio"
              id={option.value}
              name={name}
              value={option.value}
              checked={selectedOption === option.value}
              onChange={handleRadioChange}
              className="form-check-input"
            />
            <label htmlFor={option.value} className="form-check-label">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

import React, { ChangeEvent } from "react";

interface SelectInputProps {
  name: string;
  label: string;
  options: { value: string | number; label: string }[];
  value: string | number;
  onChange: (name: string, value: string) => void;
}

export const SelectInput = ({
  name,
  label,
  options,
  value,
  onChange,
}: SelectInputProps) => {
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    onChange(name, selectedValue);
  };

  return (
    <div className="form-group mb-3">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={handleSelectChange}
        className="form-control"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

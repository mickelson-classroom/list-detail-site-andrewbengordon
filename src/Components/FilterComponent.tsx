import React from "react";

interface FilterComponentProps {
  filterSongs: (filterValue: string) => void;
}

function FilterComponent({ filterSongs }: FilterComponentProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = event.target.value;
    filterSongs(filterValue);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Filter items"
        onChange={handleChange}
        className="my-2"
      />
    </div>
  );
}

export default FilterComponent;

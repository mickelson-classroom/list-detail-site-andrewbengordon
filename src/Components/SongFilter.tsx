import React from "react";

interface SongFilterProps {
  filterSongs: (filterValue: string) => void;
}

export const SongFilter = ({ filterSongs }: SongFilterProps) => {
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
};

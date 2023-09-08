import React from "react";
import { Song } from "./ParentComponent";

interface ListComponentProps {
  songs: Song[];
  selectedSong?: Song;
  selectSong: (item: Song) => void;
}

export const ListComponent = ({
  songs,
  selectedSong,
  selectSong,
}: ListComponentProps) => {
  return (
    <div className="row m-2">
      <h2>Songs</h2>
      {songs.map((item) => (
        <button
          key={item.id}
          onClick={() => selectSong(item)}
          className={`my-2 btn ${
            selectedSong?.id === item.id ? "btn-primary" : "btn-light"
          }`}
        >
          {item.title}
        </button>
      ))}
    </div>
  );
};

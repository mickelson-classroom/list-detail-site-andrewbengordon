import React from "react";
import { Song } from "./ParentComponent";

interface ListComponentProps {
  songs: Song[];
  selectedSong?: Song;
  selectSong: (item: Song) => void;
}

function ListComponent({
  songs,
  selectedSong,
  selectSong,
}: ListComponentProps) {
  return (
    <div className="list">
      <h2>Songs</h2>
      {songs.map((item) => (
        <h4
          key={item.id}
          onClick={() => selectSong(item)}
          className={selectedSong?.id === item.id ? "selected" : ""}
        >
          {item.title}
        </h4>
      ))}
    </div>
  );
}

export default ListComponent;

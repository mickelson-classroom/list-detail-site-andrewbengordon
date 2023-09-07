import React from "react";
import { Song } from "./ParentComponent";
import { Button } from "react-bootstrap";

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
    <div className="row m-2">
      <h2>Songs</h2>
      {songs.map((item) => (
        <Button
          key={item.id}
          onClick={() => selectSong(item)}
          className={`my-2 ${selectedSong?.id === item.id ? "btn-primary" : "btn-light"}`}
        >
          {item.title}
        </Button>
      ))}
    </div>
  );
}

export default ListComponent;

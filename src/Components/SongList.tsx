import React from "react";
import { Song } from "./MainLayout";

interface SongListProps {
  songs: Song[];
  selectedSong?: Song;
  selectSong: (item: Song) => void;
}

export const SongList = ({
  songs,
  selectedSong,
  selectSong,
}: SongListProps) => {
  return (
    <div className="row m-2">
      <h2>Songs</h2>
      <ul className="list-group">
        {songs.map((item) => (
          <li
            key={item.id}
            role="button"
            onClick={() => selectSong(item)}
            className={` list-group-item ${
              selectedSong?.id === item.id && "active"
            }`}
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

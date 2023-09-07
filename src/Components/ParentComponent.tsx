import React, { useState } from "react";
import FilterComponent from "./FilterComponent";
import ListComponent from "./ListComponent";
import DetailComponent from "./DetailComponent";
import AddNewItemComponent from "./AddNewComponent";

export interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  genres: string[];
}

function ParentComponent() {
  const [songs, setSongs] = useState<Song[]>(defaultSongs);
  const [filteredSongs, setFilteredSongs] = useState<Song[]>(songs);
  const [selectedSong, setSelectedSong] = useState<Song | undefined>();

  const addSong = (newItem: Song) => {
    setSongs((prevItems) => [...prevItems, newItem]);
    setFilteredSongs((prevItems) => [...prevItems, newItem]);
  };

  const removeSong = (itemId: number) => {
    setSongs((prevItems) => prevItems.filter((item) => item.id !== itemId));
    setSelectedSong(undefined);
  };

  const filterSongs = (filterValue: string) => {
    const filtered = songs.filter((item) =>
      item.title.toLowerCase().includes(filterValue.toLowerCase())
    );
    setFilteredSongs(filtered);
  };

  const selectItem = (item: Song) => {
    setSelectedSong(item);
  };

  return (
    <div className="parent container text-center">
      <div className="row">
        <div className="col-md-3 col-sm-6">
          <FilterComponent filterSongs={filterSongs} />
          <ListComponent
            songs={filteredSongs}
            selectedSong={selectedSong}
            selectSong={selectItem}
          />
        </div>
        <div className="col-sm-6">
          <DetailComponent
            selectedSong={selectedSong}
            removeSong={removeSong}
          />
        </div>
        <div className="col-md-3">
          <AddNewItemComponent addSong={addSong} />
        </div>
      </div>
    </div>
  );
}

const defaultSongs: Song[] = [
  {
    id: 1,
    title: "Pyschosalad",
    artist: "The Wiggles",
    album: "Pyschosalad",
    genres: ["Children's Music", "Rock"],
  },
  {
    id: 2,
    title: "Cool Song No. 2",
    artist: "MGMT",
    album: "Alien Days",
    genres: ["Alternative"],
  },
  {
    id: 3,
    title: "Heart On My Sleeve",
    artist: "Drake",
    album: "Heart On My Sleeve",
    genres: ["Hip Hop"],
  },
];

export default ParentComponent;

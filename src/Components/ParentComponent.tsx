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
}

function ParentComponent() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
  const [selectedSong, setSelectedSong] = useState<Song | undefined>();

  const addSong = (newItem: Song) => {
    setSongs((prevItems) => [...prevItems, newItem]);
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
    <div className="parent">
      <FilterComponent filterSongs={filterSongs} />
      <ListComponent
        songs={filteredSongs.length > 0 ? filteredSongs : songs}
        selectedSong={selectedSong}
        selectSong={selectItem}
      />
      <DetailComponent selectedSong={selectedSong} removeSong={removeSong} />
      <AddNewItemComponent addSong={addSong} />
    </div>
  );
}

export default ParentComponent;

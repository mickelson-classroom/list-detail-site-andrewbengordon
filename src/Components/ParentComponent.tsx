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
  releaseYear: number;
  rating: number;
}

function ParentComponent() {
  const [songs, setSongs] = useState<Song[]>(defaultSongs);
  const [filteredSongs, setFilteredSongs] = useState<Song[]>(songs);
  const [selectedSong, setSelectedSong] = useState<Song | undefined>();
  const [showModal, setShowModal] = useState(false);

  const addSong = (newItem: Song) => {
    setSongs((prevItems) => [...prevItems, newItem]);
    setFilteredSongs((prevItems) => [...prevItems, newItem]);
  };

  const removeSong = (itemId: number) => {
    setSongs((prevItems) => prevItems.filter((item) => item.id !== itemId));
    setFilteredSongs((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
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

  const addGenre = (genre: string) => {
    setSelectedSong((prevItem) => {
      if (prevItem) {
        prevItem.genres.push(genre);
        return { ...prevItem };
      }
    });
  };

  const deleteGenre = (genre: string) => {
    setSelectedSong((prevItem) => {
      if (prevItem) {
        prevItem.genres = prevItem.genres.filter((g) => g !== genre);
        return { ...prevItem };
      }
    });
  };

  return (
    <div className="parent container text-center">
      <div className="row">
        <div className="col-sm-6">
          <FilterComponent filterSongs={filterSongs} />
          <ListComponent
            songs={filteredSongs}
            selectedSong={selectedSong}
            selectSong={selectItem}
          />
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary my-2"
          >
            Add New Song
          </button>
        </div>
        <div className="col-sm-6">
          <DetailComponent
            selectedSong={selectedSong}
            removeSong={removeSong}
            addGenre={addGenre}
            deleteGenre={deleteGenre}
          />
        </div>
        <AddNewItemComponent
          addSong={addSong}
          onHide={() => setShowModal(false)}
          show={showModal}
        />
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
    releaseYear: 2020,
    rating: 5,
  },
  {
    id: 2,
    title: "Cool Song No. 2",
    artist: "MGMT",
    album: "Alien Days",
    genres: ["Alternative"],
    releaseYear: 2013,
    rating: 4,
  },
  {
    id: 3,
    title: "Heart On My Sleeve",
    artist: "Drake",
    album: "Heart On My Sleeve",
    genres: ["Hip Hop"],
    releaseYear: 2018,
    rating: 3,
  },
];

export default ParentComponent;

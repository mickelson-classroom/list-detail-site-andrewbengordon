import React, { useState } from "react";
import { Song } from "./ParentComponent";
import { AddGenreModal } from "./AddGenreModal";

interface DetailComponentProps {
  selectedSong?: Song;
  removeSong: (itemId: number) => void;
  addGenre: (genre: string) => void;
  deleteGenre: (genre: string) => void;
}

export const DetailComponent = ({
  selectedSong,
  removeSong,
  addGenre,
  deleteGenre,
}: DetailComponentProps) => {
  const [showModal, setShowModal] = useState(false);

  const SongDetail = {
    Artist: selectedSong?.artist,
    Album: selectedSong?.album,
    "Release Year": selectedSong?.releaseYear,
    Rating: selectedSong?.rating,
  };

  const handleAddGenre = (genre: string) => {
    addGenre(genre);
  };

  const handleDeleteSong = () => {
    if (selectedSong) {
      removeSong(selectedSong.id);
    }
  };

  const handleDeleteGenre = (genre: string) => {
    deleteGenre(genre);
  };

  return (
    <div className="card m-2 p-2">
      <button
        data-bs-toggle="collapse"
        data-bs-target="#song-details"
        className="btn fs-2"
        aria-expanded="false"
        aria-controls="song-details"
        onClick={(e) => e.preventDefault()}
      >
        Song Details
      </button>
      <div id="song-details" className="collapse">
        {selectedSong ? (
          <div>
            <hr />
            <strong className="fs-2">{selectedSong.title}</strong>
            {Object.entries(SongDetail).map(([key, value]) => (
              <div className="fs-3">
                <strong>{key}</strong>: {value}
              </div>
            ))}
            <br />
            <strong className="fs-3">Genres</strong>
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {selectedSong.genres.map((genre, index) => (
                <div className="card m-2" key={index}>
                  <h6 className="px-2 pt-2">{genre}</h6>
                  <button
                    className="btn btn-link px-2 py-1"
                    onClick={() => handleDeleteGenre(genre)}
                  >
                    Delete
                  </button>
                </div>
              ))}
              <button
                className="btn btn-primary"
                onClick={() => setShowModal(true)}
              >
                +
              </button>
            </div>
            <br />
            <button className="btn btn-danger" onClick={handleDeleteSong}>
              Delete
            </button>
            <AddGenreModal
              show={showModal}
              onHide={() => setShowModal(false)}
              onAddGenre={handleAddGenre}
            />
          </div>
        ) : (
          <p>No Song Selected</p>
        )}
      </div>
    </div>
  );
};

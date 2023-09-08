import React, { useState } from "react";
import { Song } from "./ParentComponent";
import AddGenreModal from "./AddGenreModal";

interface DetailComponentProps {
  selectedSong?: Song;
  removeSong: (itemId: number) => void;
  addGenre: (genre: string) => void;
  deleteGenre: (genre: string) => void;
}

function DetailComponent({
  selectedSong,
  removeSong,
  addGenre,
  deleteGenre,
}: DetailComponentProps) {
  const [showModal, setShowModal] = useState(false);

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
      <a
        href="#song-details"
        data-bs-toggle="collapse"
        className="card-title h2"
        role="button"
        aria-expanded="false"
        onClick={(e) => e.preventDefault()}
      >
        Song Details
      </a>
      <div id="song-details" className="collapse">
        {selectedSong ? (
          <div>
            <h6 className="py-3">Title: {selectedSong.title}</h6>
            <p>Artist: {selectedSong.artist}</p>
            <p>Album: {selectedSong.album}</p>
            <h6>Genres</h6>
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {selectedSong.genres.map((genre, index) => (
                <div className="card m-2" key={index}>
                  <h6 className="px-2 pb-1 pt-2">{genre}</h6>
                  <a
                    className="px-2 pb-1"
                    href="#"
                    onClick={() => handleDeleteGenre(genre)}
                  >
                    Delete
                  </a>
                </div>
              ))}
              <button
                className="btn btn-primary"
                onClick={() => setShowModal(true)}
              >
                +
              </button>
            </div>
            <p>Release Year: {selectedSong.releaseYear}</p>
            <p>Rating: {selectedSong.rating}</p>
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
}

export default DetailComponent;

import React, { useState } from "react";
import { Song } from "./MainLayout";
import { AddGenreModal } from "./AddGenreModal";
import { EditSong } from "./EditSong";
import { validate } from "../helpers/validate";

interface SongDetailsProps {
  selectedSong?: Song;
  removeSong: (itemId: number) => void;
  addGenre: (genre: string) => void;
  deleteGenre: (genre: string) => void;
  updateSongDetails: (updatedSong: Song) => void;
}

export const SongDetails = ({
  selectedSong,
  removeSong,
  addGenre,
  deleteGenre,
  updateSongDetails,
}: SongDetailsProps) => {
  const [showModal, setShowModal] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSong, setEditedSong] = useState<Song | undefined>(selectedSong);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const SongDetail = {
    Artist: selectedSong?.artist,
    Album: selectedSong?.album,
    "Release Year": selectedSong?.releaseYear,
    Rating: selectedSong?.rating,
    "File Type": selectedSong?.fileType,
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

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleEditClick = () => {
    setEditedSong(selectedSong);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (editedSong) {
      const errors = validate(editedSong);
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
      } else {
        setValidationErrors({});
        updateSongDetails(editedSong);
        setIsEditing(false);
      }
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (editedSong) {
      setEditedSong({
        ...editedSong,
        [name]: value,
      });
      const errors = validate(editedSong);
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
      } else {
        setValidationErrors({});
      }
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    if (editedSong) {
      setEditedSong({
        ...editedSong,
        [name]: value,
      });
    }
  };

  return (
    <div className="card m-2">
      <div
        data-bs-toggle="collapse"
        data-bs-target="#song-details"
        className="fs-2 py-2"
        role="button"
        aria-expanded={!isCollapsed}
        aria-controls="song-details"
        onClick={(e) => {
          e.preventDefault();
          toggleCollapse();
        }}
      >
        Song Details &nbsp;
        {isCollapsed ? (
          <i className="bi bi-chevron-down"></i>
        ) : (
          <i className="bi bi-chevron-up"></i>
        )}
      </div>
      <div id="song-details" className="collapse">
        {selectedSong ? (
          <div>
            <hr className="m-0" />
            {isEditing ? (
              <EditSong
                editedSong={editedSong}
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
                handleSaveClick={handleSaveClick}
                handleCancelClick={handleCancelClick}
                validationErrors={validationErrors}
              />
            ) : (
              <div>
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
                <button
                  className="btn btn-danger mb-4"
                  onClick={handleDeleteSong}
                >
                  Delete
                </button>
                <button
                  className="btn btn-warning mb-4 ms-1"
                  onClick={handleEditClick}
                >
                  Edit
                </button>
              </div>
            )}
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

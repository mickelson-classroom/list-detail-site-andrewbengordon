import React, { useState } from "react";
import { Song } from "./ParentComponent";

interface AddNewSongComponentProps {
  addSong: (newSong: Song) => void;
  show: boolean;
  onHide: () => void;
}

export const AddNewSongComponent = ({
  addSong,
  show,
  onHide,
}: AddNewSongComponentProps) => {
  const initialSongData: Song = {
    id: new Date().getTime(),
    title: "",
    artist: "",
    album: "",
    genres: [],
    releaseYear: 2023,
    rating: 5,
  };

  const [songData, setSongData] = useState<Song>(initialSongData);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "genres") {
      const genres = value.split(",");
      setSongData((prevData) => ({
        ...prevData,
        [name]: genres,
      }));
    } else {
      setSongData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const errors: Record<string, string> = {};

    if (songData.title.length === 0) {
      errors["title"] = "Please enter a title.";
    }

    if (songData.artist.length === 0) {
      errors["artist"] = "Please enter an artist.";
    }

    if (songData.album.length === 0) {
      errors["album"] = "Please enter an album.";
    }

    if (songData.rating < 1 || songData.rating > 5) {
      errors["rating"] = "Please enter a rating between 1 and 5.";
    }

    if (songData.genres.length === 0) {
      errors["genres"] = "Please enter at least one genre.";
    }

    if (
      songData.releaseYear < 1900 ||
      songData.releaseYear > new Date().getFullYear()
    ) {
      errors["releaseYear"] =
        "Please enter a release year between 1900 and the current year.";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
    } else {
      addSong(songData);

      setSongData(initialSongData);
      setValidationErrors({});

      onHide();
    }
  };

  return (
    <div>
      {show && (
        <div
          className="modal-backdrop"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 1040,
          }}
          onClick={onHide}
        ></div>
      )}
      <div
        className={`modal ${show ? "show" : ""}`}
        style={{ display: show ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Song</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onHide}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    required
                    type="text"
                    className={`form-control ${
                      validationErrors["title"] ? "is-invalid" : ""
                    }`}
                    name="title"
                    placeholder="Enter title"
                    value={songData.title}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">Please enter a title.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="artist" className="form-label">
                    Artist
                  </label>
                  <input
                    required
                    type="text"
                    className={`form-control ${
                      validationErrors["artist"] ? "is-invalid" : ""
                    }`}
                    name="artist"
                    placeholder="Enter artist"
                    value={songData.artist}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">
                    Please enter an artist.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="album" className="form-label">
                    Album
                  </label>
                  <input
                    required
                    type="text"
                    className={`form-control ${
                      validationErrors["album"] ? "is-invalid" : ""
                    }`}
                    name="album"
                    placeholder="Enter album"
                    value={songData.album}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">Please enter an album.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="genres" className="form-label">
                    Genres
                  </label>
                  <input
                    required
                    className={`form-control ${
                      validationErrors["genres"] ? "is-invalid" : ""
                    }`}
                    name="genres"
                    placeholder="Enter genres separated by commas"
                    value={songData.genres.join(",")}
                    onChange={handleChange}
                  ></input>
                  <div className="invalid-feedback">
                    Please enter at least one genre.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="releaseYear" className="form-label">
                    Release Year
                  </label>
                  <input
                    required
                    type="number"
                    className={`form-control ${
                      validationErrors["releaseYear"] ? "is-invalid" : "is-valid"
                    }`}
                    name="releaseYear"
                    placeholder="Enter release year"
                    value={songData.releaseYear}
                    onChange={handleChange}
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <div className="invalid-feedback">
                    Please enter a release year between 1900 and the current
                    year.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="rating" className="form-label">
                    Rating
                  </label>
                  <input
                    required
                    type="number"
                    className={`form-control ${
                      validationErrors["rating"] ? "is-invalid" : "is-valid"
                    }`}
                    name="rating"
                    placeholder="Enter rating between 1 and 5"
                    value={songData.rating}
                    onChange={handleChange}
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <div className="invalid-feedback">
                    Please enter a rating between 1 and 5.
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onHide}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Add Song
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { Song } from "./ParentComponent";

interface AddNewSongComponentProps {
  addSong: (newSong: Song) => void;
  show: boolean;
  onHide: () => void;
}

function AddNewSongComponent({
  addSong,
  show,
  onHide,
}: AddNewSongComponentProps) {
  const [songData, setSongData] = useState<Song>({
    id: new Date().getTime(),
    title: "",
    artist: "",
    album: "",
    genres: [],
    releaseYear: 0,
    rating: 0,
  });
  const [validated, setValidated] = useState(false);

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
    const form = event.currentTarget as HTMLFormElement;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      addSong(songData);

      setSongData({
        id: new Date().getTime(),
        title: "",
        artist: "",
        album: "",
        genres: [],
        releaseYear: 0,
        rating: 0,
      });

      onHide();
    }
    setValidated(true);
  };

  return (
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
            <form
              noValidate
              className={validated ? "was-validated" : ""}
              onSubmit={handleSubmit}
            >
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
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
                  className="form-control"
                  name="artist"
                  placeholder="Enter artist"
                  value={songData.artist}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">Please enter an artist.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="album" className="form-label">
                  Album
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
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
                  className="form-control"
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
                  className="form-control"
                  name="releaseYear"
                  placeholder="Enter release year"
                  value={songData.releaseYear}
                  onChange={handleChange}
                />
                <div className="invalid-feedback">
                  Please enter a release year.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="rating" className="form-label">
                  Rating
                </label>
                <input
                  required
                  type="number"
                  className="form-control"
                  name="rating"
                  placeholder="Enter rating between 1 and 5"
                  value={songData.rating}
                  onChange={handleChange}
                />
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
  );
}

export default AddNewSongComponent;

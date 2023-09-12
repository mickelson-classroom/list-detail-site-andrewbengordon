import React, { useState } from "react";
import { Song } from "./MainLayout";
import { TextInput } from "./TextInput";
import { validate } from "../helpers/validate";
import { SelectInput } from "./SelectInput";
import { RadioInput } from "./RadioInput";
import { radioOptions } from "../constants/radioOptions";
import { selectOptions } from "../constants/selectOptions";

interface AddNewSongProps {
  addSong: (newSong: Song) => void;
  show: boolean;
  onHide: () => void;
}

export const AddNewSong = ({ addSong, show, onHide }: AddNewSongProps) => {
  const initialSongData: Song = {
    id: new Date().getTime(),
    title: "",
    artist: "",
    album: "",
    genres: [],
    releaseYear: 2023,
    rating: 5,
    fileType: "mp3",
  };

  const [songData, setSongData] = useState<Song>(initialSongData);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const handleSelectChange = (name: string, value: string | number) => {
    setSongData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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

    const errors = validate(songData);

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
    } else {
      setValidationErrors({});
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const errors = validate(songData);

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
                <TextInput
                  label="Title"
                  name="title"
                  value={songData.title}
                  onChange={handleChange}
                  required
                  className={validationErrors["title"] ? "is-invalid" : ""}
                  validFeedback="Looks good!"
                  invalidFeedback={validationErrors["title"]}
                />
                <TextInput
                  label="Artist"
                  name="artist"
                  value={songData.artist}
                  onChange={handleChange}
                  required
                  className={validationErrors["artist"] ? "is-invalid" : ""}
                  validFeedback="Looks good!"
                  invalidFeedback={validationErrors["artist"]}
                />
                <TextInput
                  label="Album"
                  name="album"
                  value={songData.album}
                  onChange={handleChange}
                  required
                  className={validationErrors["album"] ? "is-invalid" : ""}
                  validFeedback="Looks good!"
                  invalidFeedback={validationErrors["album"]}
                />
                <TextInput
                  label="Genres"
                  name="genres"
                  value={songData.genres.join(",")}
                  onChange={handleChange}
                  required
                  className={validationErrors["genres"] ? "is-invalid" : ""}
                  validFeedback="Looks good!"
                  invalidFeedback={validationErrors["genres"]}
                />
                <TextInput
                  label="Release Year"
                  name="releaseYear"
                  value={songData.releaseYear}
                  type="number"
                  onChange={handleChange}
                  required
                  className={
                    validationErrors["releaseYear"] ? "is-invalid" : "is-valid"
                  }
                  validFeedback="Looks good!"
                  invalidFeedback={validationErrors["releaseYear"]}
                />
                <SelectInput
                  label="Rating"
                  name="rating"
                  value={songData.rating}
                  options={selectOptions}
                  onChange={handleSelectChange}
                />
                <RadioInput
                  label="File Type"
                  name="fileType"
                  selectedOption={songData.fileType}
                  options={radioOptions}
                  onChange={handleSelectChange}
                />
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

import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Song } from "./ParentComponent";

interface AddNewSongComponentProps {
  addSong: (newSong: Song) => void;
}

function AddNewSongComponent({ addSong }: AddNewSongComponentProps) {
  const [songData, setSongData] = useState<Song>({
    id: new Date().getTime(),
    title: "",
    artist: "",
    album: "",
    genres: [],
  });

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

    if (
      songData.title.trim() !== "" &&
      songData.artist.trim() !== "" &&
      songData.album.trim() !== "" &&
      songData.genres.length > 0
    ) {
      addSong(songData);

      setSongData({
        id: new Date().getTime(),
        title: "",
        artist: "",
        album: "",
        genres: [],
      });
    }
  };

  return (
    <div>
      <h2>Add New Song</h2>
      <form onSubmit={handleSubmit} className="form container">
        <div className="row">
          <label className="form-label col-lg-4">Title</label>
          <input
            type="text"
            name="title"
            className="col-lg-8"
            value={songData.title}
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <label className="form-label col-lg-4">Artist</label>
          <input
            type="text"
            name="artist"
            className="col-lg-8"
            value={songData.artist}
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <label className="form-label col-lg-4">Album</label>
          <input
            type="text"
            name="album"
            className="col-lg-8"
            value={songData.album}
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <label className="form-label col-lg-4">Genres</label>
          <input
            type="text"
            name="genres"
            className="col-lg-8"
            value={songData.genres.join(",")}
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <div className="col-4" />
          <div className="col-lg-8">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddNewSongComponent;

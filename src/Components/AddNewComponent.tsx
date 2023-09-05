import React, { useState } from "react";
import { Button } from "react-bootstrap";

interface Item {
  id: number;
  title: string;
  artist: string;
  album: string;
}

interface AddNewItemComponentProps {
  addSong: (newItem: Item) => void;
}

function AddNewItemComponent({ addSong: addItem }: AddNewItemComponentProps) {
  const [songData, setSongData] = useState<Item>({
    id: new Date().getTime(),
    title: "",
    artist: "",
    album: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSongData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      songData.title.trim() !== "" &&
      songData.artist.trim() !== "" &&
      songData.album.trim() !== ""
    ) {
      addItem(songData);

      setSongData({
        id: new Date().getTime(),
        title: "",
        artist: "",
        album: "",
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

export default AddNewItemComponent;

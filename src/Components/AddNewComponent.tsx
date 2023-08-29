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
    <div className="add">
      <h2>Add New Song</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="title"
          value={songData.title}
          placeholder="Title"
          onChange={handleChange}
        />
        <input
          type="text"
          name="artist"
          value={songData.artist}
          placeholder="Artist"
          onChange={handleChange}
        />
        <input
          type="text"
          name="album"
          value={songData.album}
          placeholder="Album"
          onChange={handleChange}
        />
        <Button variant="primary" type="submit">
          Add
        </Button>
      </form>
    </div>
  );
}

export default AddNewItemComponent;

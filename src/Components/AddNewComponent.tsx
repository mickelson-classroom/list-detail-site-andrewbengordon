import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
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

      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Add New Song</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter title"
              value={songData.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="artist">
            <Form.Label>Artist</Form.Label>
            <Form.Control
              type="text"
              name="artist"
              placeholder="Enter artist"
              value={songData.artist}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="album">
            <Form.Label>Album</Form.Label>
            <Form.Control
              type="text"
              name="album"
              placeholder="Enter album"
              value={songData.album}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="genres">
            <Form.Label>Genres</Form.Label>
            <Form.Control
              type="text"
              name="genres"
              placeholder="Enter genres separated by commas"
              value={songData.genres.join(",")}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add Song
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddNewSongComponent;

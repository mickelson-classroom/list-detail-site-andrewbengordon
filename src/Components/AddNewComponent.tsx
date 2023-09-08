import React, { useState } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import { Song } from "./ParentComponent";
import { text } from "stream/consumers";

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

    if (
      form.checkValidity() === false
    ) {
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
    <Modal show={show} onHide={onHide} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Add New Song</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                name="title"
                placeholder="Enter title"
                value={songData.title}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a title.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="artist">
              <Form.Label>Artist</Form.Label>
              <Form.Control
                required
                type="text"
                name="artist"
                placeholder="Enter artist"
                value={songData.artist}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter an artist.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="album">
              <Form.Label>Album</Form.Label>
              <Form.Control
                required
                type="text"
                name="album"
                placeholder="Enter album"
                value={songData.album}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter an album.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group controlId="genres">
              <Form.Label>Genres</Form.Label>
              <Form.Control
                required
                as="textarea"
                name="genres"
                placeholder="Enter genres separated by commas"
                value={songData.genres.join(",")}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter at least one genre.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="releaseYear">
              <Form.Label>Release Year</Form.Label>
              <Form.Control
                required
                type="number"
                name="releaseYear"
                placeholder="Enter release year"
                value={songData.releaseYear}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a release year.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="rating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                required
                type="number"
                name="rating"
                placeholder="Enter rating between 1 and 5"
                value={songData.rating}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a rating between 1 and 5.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
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

import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface AddGenreModalProps {
  show: boolean;
  onHide: () => void;
  onAddGenre: (genre: string) => void;
}

const AddGenreModal = ({ show, onHide, onAddGenre }: AddGenreModalProps) => {
  const [genre, setGenre] = useState<string>("");

  const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGenre(event.target.value);
  };

  const handleAddGenre = () => {
    if (genre.trim() === "") {
      alert("Genre cannot be empty");
      return;
    }

    onAddGenre(genre);
    setGenre("");
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Genre</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="genreInput">
          <Form.Label>Genre Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter genre"
            value={genre}
            onChange={handleGenreChange}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddGenre}>
          Add Genre
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddGenreModal;

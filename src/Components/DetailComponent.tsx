import React, { useState } from "react";
import { Song } from "./ParentComponent";
import { Button, Card } from "react-bootstrap";
import AddGenreModal from "./AddGenreModal";

interface DetailComponentProps {
  selectedSong?: Song;
  removeSong: (itemId: number) => void;
}

function DetailComponent({ selectedSong, removeSong }: DetailComponentProps) {
  const [showModal, setShowModal] = useState(false);

  const handleAddGenre = (genre: string) => {
    selectedSong?.genres.push(genre);
  };

  const handleDelete = () => {
    if (selectedSong) {
      removeSong(selectedSong.id);
    }
  };

  return (
    <div>
      <h2>Song Details</h2>
      {selectedSong ? (
        <div>
          <div>
            <p>Title: {selectedSong.title}</p>
            <p>Artist: {selectedSong.artist}</p>
            <p>Album: {selectedSong.album}</p>
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              Genres: &nbsp;
              {selectedSong.genres.map((genre) => (
                <Card>
                  <Card.Body>{genre}</Card.Body>
                </Card>
              ))}{" "}
              &nbsp;
              <Button variant="primary" onClick={() => setShowModal(true)}>
                +
              </Button>
            </div>
          </div>
          <br />
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
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
  );
}

export default DetailComponent;

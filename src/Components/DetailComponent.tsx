import React, { useState } from "react";
import { Song } from "./ParentComponent";
import { Button, Card, Collapse } from "react-bootstrap";
import AddGenreModal from "./AddGenreModal";

interface DetailComponentProps {
  selectedSong?: Song;
  removeSong: (itemId: number) => void;
  addGenre: (genre: string) => void;
  deleteGenre: (genre: string) => void;
}

function DetailComponent({
  selectedSong,
  removeSong,
  addGenre,
  deleteGenre,
}: DetailComponentProps) {
  const [showModal, setShowModal] = useState(false);

  const handleAddGenre = (genre: string) => {
    addGenre(genre);
  };

  const handleDeleteSong = () => {
    if (selectedSong) {
      removeSong(selectedSong.id);
    }
  };

  const handleDeleteGenre = (genre: string) => {
    deleteGenre(genre);
  };

  return (
    <Card className="m-2 p-2">
      <Card.Title>Song Details</Card.Title>
      <Collapse in={selectedSong !== undefined}>
        {selectedSong ? (
          <div>
            <Card.Subtitle className="py-3">
              Title: {selectedSong.title}
            </Card.Subtitle>
            <Card.Text>Artist: {selectedSong.artist}</Card.Text>
            <Card.Text>Album: {selectedSong.album}</Card.Text>
            <Card.Subtitle>Genres</Card.Subtitle>
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {selectedSong.genres.map((genre) => (
                <Card className="m-2">
                  <Card.Subtitle className="px-2 pb-1 pt-2">
                    {genre}
                  </Card.Subtitle>
                  <Card.Link
                    className="px-2 pb-1"
                    href="#"
                    onClick={() => handleDeleteGenre(genre)}
                  >
                    Delete
                  </Card.Link>
                </Card>
              ))}
              <Button variant="primary" onClick={() => setShowModal(true)}>
                +
              </Button>
            </div>
            <Card.Text>Release Year: {selectedSong.releaseYear}</Card.Text>
            <Card.Text>Rating: {selectedSong.rating}</Card.Text>
            <br />
            <Button variant="danger" onClick={handleDeleteSong}>
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
      </Collapse>
    </Card>
  );
}

export default DetailComponent;

import React from "react";
import { Song } from "./ParentComponent";
import { Button, Card } from "react-bootstrap";

interface DetailComponentProps {
  selectedSong?: Song;
  removeSong: (itemId: number) => void;
}

function DetailComponent({ selectedSong, removeSong }: DetailComponentProps) {
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
              ))}
            </div>
          </div>
          <br />
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      ) : (
        <p>No Song Selected</p>
      )}
    </div>
  );
}

export default DetailComponent;

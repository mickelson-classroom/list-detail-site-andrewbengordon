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
      {selectedSong && (
        <div>
          <h2>Song Details</h2>
          <div className="row">
            <p>Title: {selectedSong.title}</p>
            <p>Artist: {selectedSong.artist}</p>
            <p>Album: {selectedSong.album}</p>
          </div>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}

export default DetailComponent;

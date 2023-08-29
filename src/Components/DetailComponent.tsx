import React from "react";
import { Song } from "./ParentComponent";
import { Button, Card } from "react-bootstrap";

interface DetailComponentProps {
  selectedSong?: Song;
  removeSong: (itemId: number) => void;
}

function DetailComponent({
  selectedSong,
  removeSong,
}: DetailComponentProps) {
  const handleDelete = () => {
    if (selectedSong) {
      removeSong(selectedSong.id);
    }
  };

  return (
    <Card border="0">
      {selectedSong && (
        <div>
          <Card.Title>Song Details</Card.Title>
          <Card.Text>Title: {selectedSong.title}</Card.Text>
          <Card.Text>Artist: {selectedSong.artist}</Card.Text>
          <Card.Text>Album: {selectedSong.album}</Card.Text>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      )}
    </Card>
  );
}

export default DetailComponent;

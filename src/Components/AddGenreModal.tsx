import React, { useState } from "react";

interface AddGenreModalProps {
  show: boolean;
  onHide: () => void;
  onAddGenre: (genre: string) => void;
}

export const AddGenreModal = ({
  show,
  onHide,
  onAddGenre,
}: AddGenreModalProps) => {
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
    <div>
      {show && (
        <div
          className="modal-backdrop"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 1040,
          }}
          onClick={onHide}
        ></div>
      )}
      <div
        className={`modal ${show ? "show" : ""}`}
        style={{ display: show ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Genre</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onHide}
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="genreInput" className="form-label">
                  Genre Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter genre"
                  value={genre}
                  onChange={handleGenreChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onHide}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddGenre}
              >
                Add Genre
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

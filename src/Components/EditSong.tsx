import { radioOptions } from "../constants/radioOptions";
import { selectOptions } from "../constants/selectOptions";
import { Song } from "./MainLayout";
import { RadioInput } from "./RadioInput";
import { SelectInput } from "./SelectInput";
import { TextInput } from "./TextInput";

interface EditSongProps {
  editedSong?: Song;
  validationErrors?: Record<string, string>;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleSaveClick: () => void;
  handleCancelClick: () => void;
}

export const EditSong = ({
  editedSong,
  validationErrors,
  handleInputChange,
  handleSelectChange,
  handleSaveClick,
  handleCancelClick,
}: EditSongProps) => {
  return (
    <div className="p-4">
      <form>
        <TextInput
          label="Title"
          name="title"
          value={editedSong?.title}
          onChange={handleInputChange}
          required
          className={validationErrors?.title ? "is-invalid" : ""}
          invalidFeedback={validationErrors?.title}
        />
        <TextInput
          label="Artist"
          name="artist"
          value={editedSong?.artist}
          onChange={handleInputChange}
          required
          className={validationErrors?.artist ? "is-invalid" : ""}
          invalidFeedback={validationErrors?.artist}
        />
        <TextInput
          label="Album"
          name="album"
          value={editedSong?.album}
          onChange={handleInputChange}
          required
          className={validationErrors?.album ? "is-invalid" : ""}
          invalidFeedback={validationErrors?.album}
        />
        <TextInput
          label="Release Year"
          name="releaseYear"
          value={editedSong?.releaseYear}
          type="number"
          onChange={handleInputChange}
          required
          className={validationErrors?.releaseYear ? "is-invalid" : ""}
          invalidFeedback={validationErrors?.releaseYear}
        />
        <SelectInput
          label="Rating"
          name="rating"
          value={editedSong?.rating!}
          options={selectOptions}
          onChange={handleSelectChange}
        />
        <RadioInput
          label="File Type"
          name="fileType"
          selectedOption={editedSong?.fileType!}
          options={radioOptions}
          onChange={handleSelectChange}
        />
        <button
          type="button"
          className="btn btn-success"
          onClick={handleSaveClick}
        >
          Save
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={handleCancelClick}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

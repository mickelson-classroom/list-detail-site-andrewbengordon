interface TextInputProps {
    label: string;
    name: string;
    type?: string;
    value?: string | number;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    required?: boolean;
    validFeedback?: string;
    invalidFeedback?: string;
}

export const TextInput = ({
  label,
  name,
  type,
  value,
  placeholder,
  onChange,
  className,
  required,
  validFeedback,
  invalidFeedback,
}: TextInputProps) => {
  return (
    <div className="mb-3">
      <label htmlFor={label} className="form-label">
        {label}
      </label>
      <input
        name={name}
        type={type}
        className={`form-control ${className}`}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
      />
      {validFeedback && <div className="valid-feedback">{validFeedback}</div>}
      {invalidFeedback && (
        <div className="invalid-feedback">{invalidFeedback}</div>
      )}
    </div>
  );
};
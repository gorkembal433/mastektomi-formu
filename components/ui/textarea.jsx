export function Textarea({ value, onChange, placeholder, readOnly = false, rows = 5, className = "" }) {
  return (
    <textarea
      className={`border p-2 rounded w-full ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      rows={rows}
    />
  );
}

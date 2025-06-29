export function Input({ placeholder, value, onChange }) {
  return (
    <input
      className="border p-2 rounded w-full"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

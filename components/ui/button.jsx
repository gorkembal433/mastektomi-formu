export function Button({ children, onClick, variant = "default", className = "px-4 py-2", type = "button" }) {
  const style = variant === "destructive"
    ? "bg-red-600 text-white"
    : variant === "outline"
    ? "border border-gray-500 text-gray-800"
    : "bg-blue-600 text-white";
  return (
    <button onClick={onClick} type={type} className={`rounded ${style} ${className}`}>
      {children}
    </button>
  );
}

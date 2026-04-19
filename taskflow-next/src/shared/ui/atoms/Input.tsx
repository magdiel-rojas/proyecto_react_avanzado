export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label style={{ margin: "4px" }} className="text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200 ${
          error ? "border-red-500" : "border-gray-300"
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
};
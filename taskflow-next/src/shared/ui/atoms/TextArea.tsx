// Server Component: no contiene 'use client', se ejecuta en el servidor por defecto.
'use client'
interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    name?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
    label,
    error,
    name,
    className = "",
    ...props
}) => {
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label htmlFor={name} style={{ margin: "4px" }} className="text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <textarea
                className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200 ${error ? "border-red-500" : "border-gray-300"} ${className}`}
                id={name}
                name={name}
                {...props}
            />
            {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
        </div>
    );
};
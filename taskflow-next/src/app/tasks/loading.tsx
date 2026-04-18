
function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse mb-4" />
            <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="w-24 h-4 bg-gray-100 rounded animate-pulse" />
            <span className="mt-6 text-gray-400 text-sm">Cargando...</span>
        </div>
    );
}

export default Loading;
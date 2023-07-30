export default function Button({ title, onClick, splashscreen = false }) {
  if (splashscreen) {
    return (
      <button
        onClick={onClick}
        className="w-400 h-50 my-1 rounded-full border-4 border-black bg-black text-2xl text-white font-medium hover:text-black hover:bg-white active:bg-gray active:text-black transition-all duration-150"
      >
        <p>{title}</p>
      </button>
    );
  } else {
    return (
      <button
        onClick={onClick}
        className="w-auto h-50 my-1 px-8 rounded-full border-4 border-black bg-black text-lg text-white font-medium hover:text-black hover:bg-white active:bg-gray active:text-black transition-all duration-150"
      >
        <p>{title}</p>
      </button>
    );
  }
}

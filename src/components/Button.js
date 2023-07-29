export default function Button({ title, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-1/6 p-2 my-1 rounded-full border-4 border-black bg-black text-white font-medium hover:text-black hover:bg-white active:bg-gray active:text-black transition-all duration-150"
    >
      <p>{title}</p>
    </button>
  );
}

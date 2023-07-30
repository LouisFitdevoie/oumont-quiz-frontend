export default function Button({ title, onClick, splashscreen = false }) {
  return (
    <button
      onClick={onClick}
      className={`${
        splashscreen ? "w-400" : "w-auto px-8"
      } h-50 my-1 rounded-full border-4 border-black bg-black text-2xl text-white font-medium hover:text-black hover:bg-white active:bg-gray active:text-black transition-all duration-150`}
      data-testid="button"
    >
      <p>{title}</p>
    </button>
  );
}

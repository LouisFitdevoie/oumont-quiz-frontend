export default function ThemeCard({ theme, isLeft, handleThemeChoice }) {
  return (
    <button
      onClick={() => handleThemeChoice(theme.id)}
      className={`${
        isLeft ? "mr-5" : ""
      } flex items-center justify-center bg-white w-full h-full rounded-2xl border-2 border-black text-2xl font-bold hover:bg-gray active:bg-opacity-75 transition-all duration-100`}
    >
      <p>{theme.name}</p>
    </button>
  );
}

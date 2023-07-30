export default function Button({
  title,
  onClick,
  splashscreen = false,
  disabled = false,
}) {
  return (
    <button
      onClick={onClick}
      className={`${
        splashscreen ? "w-400" : "w-auto px-8"
      } h-50 my-1 rounded-full border-4 ${
        disabled
          ? "bg-darkGray border-darkGray cursor-not-allowed"
          : "border-black bg-black hover:text-black hover:bg-white active:bg-gray active:text-black"
      } text-2xl text-white font-medium transition-all duration-150`}
      disabled={disabled}
      data-testid="button"
    >
      <p>{title}</p>
    </button>
  );
}

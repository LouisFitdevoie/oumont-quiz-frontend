export default function Button({
  title,
  onClick,
  splashscreen = false,
  disabled = false,
  addQuestion = false,
}) {
  let fontSize = "";
  if (splashscreen) {
    fontSize = "text-2xl";
  } else if (addQuestion) {
    fontSize = "text-base px-4 h-40";
  } else {
    fontSize = "text-xl";
  }

  return (
    <div className="flex flex-row justify-center">
      <button
        onClick={onClick}
        className={`${
          splashscreen ? "w-400 text-2xl" : `w-auto px-8 ${fontSize}`
        } h-50 my-1 rounded-full border-4 ${
          disabled
            ? "bg-darkGray border-darkGray cursor-not-allowed"
            : "border-black bg-black hover:text-black hover:bg-white active:bg-gray active:text-black"
        } text-white font-medium transition-all duration-150`}
        disabled={disabled}
        data-testid="button"
      >
        <p>{title}</p>
      </button>
    </div>
  );
}

import picture from "../assets/images/logo.png";

export default function LoadingIndicator() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-center justify-center">
        <div className="w-28 h-28 animate-bounce">
          <img
            src={picture}
            alt="Loading spinner"
            className="animate-spin-slow w-full h-full"
          />
        </div>

        <p className="mt-3 text-2xl font-semibold bg-white px-4 py-2 border-2 rounded-2xl">
          Chargement en cours...
        </p>
      </div>
    </div>
  );
}

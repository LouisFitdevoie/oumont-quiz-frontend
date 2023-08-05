import ThemeCard from "./ThemeCard";

export default function ChooseTheme({ handleThemeChoice }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-5/6 bg-white border-2 border-black rounded-2xl text-center font-bold py-2 px-4">
        <h1 className="text-xl">
          Au tour du groupe <i>NOM DU GROUPE</i> de choisir le thème de la
          prochaine question !
        </h1>
      </div>
      <div className="flex flex-row mt-4 w-5/6 h-1/2">
        <div className="flex flex-row w-full h-full">
          <ThemeCard
            theme={{ name: "Thème 1", id: "1" }}
            handleThemeChoice={handleThemeChoice}
            isLeft
          />
          <ThemeCard
            theme={{ name: "Thème 2", id: "2" }}
            handleThemeChoice={handleThemeChoice}
          />
        </div>
      </div>
    </div>
  );
}

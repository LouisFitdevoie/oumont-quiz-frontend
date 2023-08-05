import ThemeCard from "./ThemeCard";

export default function ChooseTheme({ handleThemeChoice, groupName }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-5/6 bg-white border-2 border-black rounded-2xl text-center font-medium py-2 px-4">
        <h1 className="text-xl">
          Au tour du groupe <i className="font-black font-2xl">{groupName}</i>{" "}
          de choisir le thème des 3 prochaines questions !
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

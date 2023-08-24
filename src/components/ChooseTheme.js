import Button from "./Button";
import ThemeCard from "./ThemeCard";

export default function ChooseTheme({
  handleThemeChoice,
  groupName,
  themes,
  handleEndGameClicked,
}) {
  if (themes.length > 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-5/6 bg-white border-2 border-black rounded-2xl text-center font-medium py-2 px-4">
          <h1 className="text-3xl">
            Au tour du groupe <i className="font-black text-3xl">{groupName}</i>{" "}
            de choisir le thème des 3 prochaines questions !
          </h1>
        </div>
        <div className="flex flex-row mt-4 w-5/6 h-1/2">
          <div className="flex flex-row w-full h-full">
            {themes.length === 2 && (
              <>
                <ThemeCard
                  theme={themes[0]}
                  handleThemeChoice={handleThemeChoice}
                  isLeft
                />
                <ThemeCard
                  theme={themes[1]}
                  handleThemeChoice={handleThemeChoice}
                />
              </>
            )}
            {themes.length === 1 && (
              <ThemeCard
                theme={themes[0]}
                handleThemeChoice={handleThemeChoice}
              />
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-auto bg-white border-2 border-black rounded-2xl text-center font-medium py-2 px-4 mb-2">
          <h1 className="text-2xl font-bold">
            Plus aucun thème n'est disponible, toutes les questions ont été
            posées !
          </h1>
        </div>
        <Button title="Terminer la partie" onClick={handleEndGameClicked} />
      </div>
    );
  }
}

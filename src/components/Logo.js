import logo from "../assets/images/logo.png";

export default function Logo({ splashscreen = false }) {
  if (splashscreen) {
    return (
      <div className="flex justify-end items-center">
        <img src={logo} alt="Oumont Quizz's logo" className="w-20 h-20 mr-3" />
        <h1 className="text-logoSplashscreen font-black text-black">
          Oumont Quizz
        </h1>
      </div>
    );
  } else {
    return (
      <div className="flex justify-end items-center">
        <img src={logo} alt="Oumont Quizz's logo" className="w-16 h-16 mr-3" />
        <h1 className="text-logoTitle font-black text-black">Oumont Quizz</h1>
      </div>
    );
  }
}

import Logo from "./Logo";

export default function Header({ pageTitle }) {
  return (
    <div className="w-full flex flex-row justify-between items-center">
      <Logo />
      <p className="text-black text-lg font-semibold pr-3">{pageTitle}</p>
    </div>
  );
}

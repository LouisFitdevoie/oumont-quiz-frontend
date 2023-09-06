import Logo from "./Logo";

export default function Header({ pageTitle }) {
  return (
    <div
      className="w-full flex flex-row justify-between items-center px-4"
      data-testid="header-container"
    >
      <Logo />
      <p
        className="text-black text-2xl font-semibold pr-3"
        data-testid="header-page-title"
      >
        {pageTitle}
      </p>
    </div>
  );
}

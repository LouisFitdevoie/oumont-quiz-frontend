export default function ErrorMessage({ error, visible }) {
  if (!visible || !error) return null;
  return <p className="pl-3 text-red text-lg font-bold text-center">{error}</p>;
}

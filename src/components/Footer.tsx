export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-4 text-center">
      © <span>{year}</span> G4 Glute Method.
    </footer>
  );
}

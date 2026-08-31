export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-4 text-center">
      © <span>{year}</span> Método G4 Glúteos Brasil.
    </footer>
  );
}

export const metadata = {
  title: "Mastektomi Şablonu",
  description: "Makroskopik mastektomi tarifi aracı",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}

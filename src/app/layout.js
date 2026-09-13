import "./globals.css";

export const metadata = {
  title: {
    default: "CodiceSconto | Codici sconto e offerte",
    template: "%s | CodiceSconto",
  },
  description: "Scopri codici sconto, offerte e promozioni verificate.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

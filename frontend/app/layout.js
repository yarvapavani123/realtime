import "./globals.css";

export const metadata = {
  title: "SYNCUP Feed",
  description: "Realtime Feed App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
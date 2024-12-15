import "./globals.css";
import { Rubik_Mono_One } from "next/font/google";

const rubik = Rubik_Mono_One({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Time Zone Converter",
  description: "Convert time between different countries",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={rubik.className}>{children}</body>
    </html>
  );
}

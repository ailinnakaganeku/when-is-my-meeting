import "./globals.css";
import { Metadata } from "next";
import { Rubik_Mono_One, Inter } from "next/font/google";

const rubik = Rubik_Mono_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rubik",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "When is my meeting?",
  description: "Convert time between different countries",
  openGraph: {
    title: "When is my meeting?",
    description: "Convert time between different countries",
    url: "https://whenismymeeting-ailinn.vercel.app/",
    siteName: "When is my meeting?",
    images: [
      {
        url: "/preview.png",
        width: 32,
        height: 32,
      },
    ],
    locale: "en-US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${rubik.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}

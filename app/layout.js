import localFont from "next/font/local";
import { Playfair_Display, Nunito, Montserrat, Lora, Poppins, Raleway, Roboto_Mono  } from "next/font/google";
import "./globals.css";

const geistPlayfair = Playfair_Display({
  weight: ['400', '800'],
  variable: "--font-geist-playfair",
  subsets: ["latin"]
});

const geistRobotoMono = Roboto_Mono({
  weight: ['400'],
  variable: "--font-geist-roboto-mono",
  subsets: ["latin"]
});

const geistRaleway = Raleway({
  weight: ['400', '500', '900', '800'],
  variable: "--font-geist-raleway",
  subsets: ["latin"]
});

const geistPoppins = Poppins({
  weight: ['400', '800'],
  variable: "--font-geist-poppins",
  subsets: ["latin"]
});

const geistLora = Lora({
  weight: ["400", "500"],
  variable: "--font-geist-lora",
  subsets: ["latin"]
})

const geistMontserrat = Montserrat({
  variable: "--font-giest-montserrat",
  weight: ["100", "400"],
  subsets: ["latin"]

})

const geistNunito = Nunito({
  weight: ['200', '500'],
  variable: "--font-geist-nunito",
  subsets: ["latin"]
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistPlayfair.variable} ${geistRobotoMono.variable} ${geistRaleway.variable} ${geistPoppins.variable} ${geistLora.variable} ${geistMontserrat.variable} ${geistNunito.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

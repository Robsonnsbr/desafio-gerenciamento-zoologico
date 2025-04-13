/* cSpell:disable */
import { Open_Sans, Raleway, Poppins } from "next/font/google";

export const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
});
export const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});
export const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "600"],
});

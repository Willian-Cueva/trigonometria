import { Poppins } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "@/components/navigation";
import Mates from "@/components/mates";
import Head from "next/head";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
  // preload: false
});

export const metadata = {
  title: "Trigonometría",
  description: `Trigonometría`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" type="image/png" href="/icon.png" />
      </Head>
      <body className={poppins.className}>
        <Navigation />
        <Mates>
          <div className="pt-10 px-8">{children}</div>
        </Mates>
      </body>
    </html>
  );
}

// import "./../_styles/_globals.scss";
import "@/app/_styles/_globals.scss";
import Header from "../_components/organism/Header/Header";
import Footer from "../_components/organism/Footer/Footer";

export const metadata = {
  title: "Live Cricket Score",
  description: "Get live cricket scores, match updates, and news",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

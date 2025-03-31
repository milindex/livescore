import LivescoreWidget from "@/app/_components/molecule/LivescoreWidget/LivescoreWidget";
import styles from "./page.module.scss";
import OneXBetCricData from "@/app/_components/molecule/OneXBetCricData/OneXBetCricData";

const Homepage = () => {
  return (
    <>
      <h1>This is Homepage</h1>

      {/* <LivescoreWidget /> */}

      <OneXBetCricData />
    </>
  );
};

export default Homepage;

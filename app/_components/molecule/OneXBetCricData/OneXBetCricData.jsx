"use client";

import React, { useEffect, useState } from "react";

function getCricData() {
  return [
    {
      isdeclared: false,
      number: "First",
      wides: "14",
      noballs: "0",
      allottedOvers: "20",
      penalty: "0",
      bowlingteam: "1111",
      total: "196",
      wickets: "8",
      overs: "20.0",
      runrate: "9.80",
      byes: "1",
      legbyes: "0",
      battingteam: "2955",
    },
    {
      isdeclared: false,
      number: "Second",
      wides: "6",
      noballs: "0",
      allottedOvers: "20",
      penalty: "0",
      bowlingteam: "2955",
      total: Math.floor(Math.random() * 196),
      wickets: "3",
      overs:
        Math.floor(Math.random() * 20) +
        1 +
        "." +
        Math.floor(Math.random() * 6),
      runrate: "8.43",
      byes: "0",
      legbyes: "1",
      battingteam: "1111",
      target: "197",
    },
  ];
}

const OneXBetCricData = () => {
  const [matchData, setMatchData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      console.log("Fetching data...");
      setLoading(true);
      const data = getCricData();
      if (data) {
        setMatchData(data);
      }
      setLoading(false);
    };

    fetchData();

    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cric-data">
      <h1>OneXBet Cric Data</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {matchData.map((match, index) => {
            const {
              isdeclared,
              number,
              wides,
              noballs,
              bowlingteam,
              total,
              wickets,
              overs,
              runrate,
              byes,
              legbyes,
              battingteam,
            } = match;

            return (
              <div key={index} className="match-data">
                <h2>Inning {number}</h2>
                <p>Total: {total}</p>
                <p>Wickets: {wickets}</p>
                <p>Overs: {overs}</p>
                <p>Run Rate: {runrate}</p>
                <p>Wides: {wides}</p>
                <p>No Balls: {noballs}</p>
                <p>Byes: {byes}</p>
                <p>Leg Byes: {legbyes}</p>
                <p>Bowling Team: {bowlingteam}</p>
                <p>Batting Team: {battingteam}</p>
                {isdeclared && <p>This innings is declared.</p>}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default OneXBetCricData;

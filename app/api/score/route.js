import { NextResponse } from "next/server";

export async function GET(request) {
  const data = [
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

  return NextResponse.json(data, { status: 200 });
}

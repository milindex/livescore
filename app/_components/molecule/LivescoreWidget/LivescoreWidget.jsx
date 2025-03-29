"use client";

import React, { useEffect, useState } from "react";
import styles from "./LivescoreWidget.module.scss";
import getLiveScore from "@/service/getLivescore";

const LivescoreWidget = () => {
  const [data, setData] = useState({ live: [], results: [], upcoming: [] });
  const [activeTab, setActiveTab] = useState("live");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLiveScore();
        setData({
          live: response?.live || [],
          results: response?.results || [],
          upcoming: response?.upcoming || [],
        });
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  const renderMatches = (matches, isUpcoming = false) => {
    if (!matches || matches.length === 0) {
      return <div className={styles.noMatch}>No matches available.</div>;
    }

    return (
      <>
        {matches.slice(0, visibleCount).map((match, index) => {
          if (isUpcoming) {
            const {
              teama,
              teamb,
              venue,
              matchnumber,
              matchstatus,
              matchdate_ist,
              matchtime_ist,
              seriesname,
            } = match;

            return (
              <div key={index} className={styles.matchContainer}>
                <h2 className={styles.title}>
                  {seriesname || "Unknown Series"}
                </h2>
                <div className={styles.matchDetails}>
                  <div className={styles.teams}>
                    <span>{teama || "Team A"}</span> vs{" "}
                    <span>{teamb || "Team B"}</span>
                  </div>
                  <div className={styles.venue}>{venue || "Unknown Venue"}</div>
                  <div className={styles.startTime}>
                    {`${matchnumber}, ${matchdate_ist} at ${matchtime_ist}`}
                  </div>
                  <div className={styles.status}>
                    {matchstatus || "Status Unavailable"}
                  </div>
                </div>
              </div>
            );
          } else {
            const matchDetails = match?.matchdetail;
            const teamlist = match?.teamlist || [];
            const innings = match?.innings || [];

            if (!matchDetails || teamlist.length < 2) {
              return (
                <div key={index} className={styles.matchContainer}>
                  <div className={styles.error}>Match data is incomplete.</div>
                </div>
              );
            }

            const { series, venue, status, equation } = matchDetails;

            return (
              <div key={index} className={styles.matchContainer}>
                <h2 className={styles.title}>
                  {series?.name || "Unknown Series"}
                </h2>
                <div className={styles.matchDetails}>
                  <div className={styles.teams}>
                    <span>{teamlist[0]?.name_Full || "Team A"}</span> vs{" "}
                    <span>{teamlist[1]?.name_Full || "Team B"}</span>
                  </div>
                  <div className={styles.venue}>
                    {venue?.name || "Unknown Venue"}
                  </div>
                  <div className={styles.status}>
                    {status || "Status Unavailable"}
                  </div>
                </div>

                {innings.length > 0 && (
                  <div className={styles.inningsDetails}>
                    <h3>Innings</h3>
                    <div>
                      <strong>Batting Team:</strong>{" "}
                      {teamlist.find(
                        (team) => team.team_Id === innings[1]?.battingteam
                      )?.name_Full || "N/A"}
                    </div>
                    <div>
                      <strong>Bowling Team:</strong>{" "}
                      {teamlist.find(
                        (team) => team.team_Id === innings[1]?.bowlingteam
                      )?.name_Full || "N/A"}
                    </div>
                    {innings[1]?.target && (
                      <div>
                        <strong>Target:</strong> {innings[1]?.target}
                      </div>
                    )}
                    <div>
                      <strong>Current Score:</strong> {innings[1]?.total}/
                      {innings[1]?.wickets} in {innings[1]?.overs} overs
                    </div>
                    <div>
                      <strong>Equation:</strong> {equation || "N/A"}
                    </div>
                  </div>
                )}
              </div>
            );
          }
        })}

        {matches.length > visibleCount && (
          <button onClick={handleLoadMore} className={styles.loadMoreButton}>
            Load More
          </button>
        )}
      </>
    );
  };

  return (
    <div className={styles.widgetContainer}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            activeTab === "live" ? styles.active : ""
          }`}
          onClick={() => {
            setActiveTab("live");
            setVisibleCount(3);
          }}
        >
          Live
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "results" ? styles.active : ""
          }`}
          onClick={() => {
            setActiveTab("results");
            setVisibleCount(3);
          }}
        >
          Results
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "upcoming" ? styles.active : ""
          }`}
          onClick={() => {
            setActiveTab("upcoming");
            setVisibleCount(3);
          }}
        >
          Upcoming
        </button>
      </div>
      <div className={styles.tabContent}>
        {activeTab === "live" && renderMatches(data.live)}
        {activeTab === "results" && renderMatches(data.results)}
        {activeTab === "upcoming" && renderMatches(data.upcoming, true)}
      </div>
    </div>
  );
};

export default LivescoreWidget;

import React, { useEffect } from "react";
import { Loader, Tabs, LeaguesSidebar, TopMatchCarousel } from "../components";
import useCompetitionStore from "../store/useCompetitionStore";

const Home = () => {
  const {
    fetchAllInitialData,
    competitionsLoading,
    topMatchesLoading,
    competitionsFetched,
    topMatchesFetched,
  } = useCompetitionStore();

  const loading = competitionsLoading || topMatchesLoading;

  useEffect(() => {
    if (!competitionsFetched || !topMatchesFetched) {
      fetchAllInitialData();
    }
  }, [competitionsFetched, topMatchesFetched]);

  if (loading || !competitionsFetched || !topMatchesFetched) {
    return (
      <div style={{ padding: "20px" }}>
        <Loader />
      </div>
    );
  }
  return (
    <div style={{ display: "grid", gridTemplateColumns: "2fr", gap: "20px" }}>
      <div>
        <TopMatchCarousel />
        <Tabs />
      </div>
      {/* <LeaguesSidebar /> */}
    </div>
  );
};

export default Home;

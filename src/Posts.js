import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchposts } from "./Action";

function Posts(props) {
  const dispatch = useDispatch();
  const value = useSelector((state) => {
    return state;
  });
  //console.log("value", value);
  useEffect(() => {
    dispatch(fetchposts());
  }, [dispatch]);

  const renderposts = () => {
    if (value.loading) {
      return <h1>Loading</h1>;
    }

    const usaGames = value.items.filter(
      (e) => e.home_team_country === "USA" || e.away_team_country === "USA"
    );
    console.log("usaGames:", usaGames);
    let countHomeGames = 0;
    let countAwayGames = 0;
    let countHomeWin = 0;
    let countAwayWin = 0;
    let goals = 0;
    usaGames.forEach((el) => {
      el.home_team_country === "USA" ? countHomeGames++ : countAwayGames++;
      if (el.home_team_country === "USA" && el.winner === "USA") countHomeWin++;
      else if (el.away_team_country === "USA" && el.winner === "USA")
        countAwayWin++;
      el.home_team_country === "USA"
        ? (goals += el.home_team.goals)
        : (goals += el.away_team.goals);
    });
    const percentHomeWin = (countHomeWin / countHomeGames) * 100;
    const percentAwayWin = (countAwayWin / countAwayGames) * 100;
    console.log("countHomeGames=", countHomeGames);
    console.log("countAwayGames=", countAwayGames);
    console.log("countHomeWin=", countHomeWin);
    console.log("countAwayWin=", countAwayWin);
    console.log("goals=", goals);
    console.log("percentHomeWin=", percentHomeWin);
    console.log("percentAwayWin=", percentAwayWin);

    return (
      <div>
        <h1>FIFA World Cup 2019</h1>
        <h3>Country: USA</h3>
        <table className="table">
          <thead>
            <tr className="row">
              <th>No. of games played at home</th>
              <th>Percentage win at Home</th>
              <th>No. of games played Away</th>
              <th>Percentage win Away</th>
              <th>Total Number of Goals</th>
            </tr>
          </thead>
          <tbody>
            <tr className="row">
              <td>{countHomeGames}</td>
              <td>{percentHomeWin}</td>
              <td>{countAwayGames}</td>
              <td>{percentAwayWin}</td>
              <td>{goals}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  return <div> {renderposts()}</div>;
}

export default Posts;

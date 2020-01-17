import React, { Component, Fragment } from 'react';
import axios from 'axios';
import cn from 'classnames';

import './teams.scss';

class TeamComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamData: [],
      LIMIT: 5,
      teamID: 1,
      games: []
    };
  }

  componentDidMount() {
    axios
      .get(`/teams`, {})
      .then(res => {
        this.setState({ teamData: res.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  requestGames = ({ team }) => {
    const { teamID } = this.state;
    this.setState({ teamID: team.id });

    axios
      .get(`/games/team/${teamID}`)
      .then(res => {
        this.setState({ games: res.data.data });
        console.log(res.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  loadMore = () => {
    const { LIMIT } = this.state;
    const newLIMIT = LIMIT + 5;

    this.setState({ LIMIT: newLIMIT });
  };

  render() {
    const { teamData, LIMIT, teamID, games } = this.state;
    console.log(this.state);

    if (!teamData) {
      return null;
    }

    teamData.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });

    return (
      <Fragment>
        <div>
          {teamData
            .filter((i, index) => index < LIMIT)
            .map(team => (
              <div className="team-wrapper">
                <div className="team-dropdown">
                  <div className="team-dropdown-btn">
                    <p className="team-name">
                      {team.name}
                      <span>({team.abbreviation})</span>
                    </p>
                    <div className="team-dropdown-content">
                      <button
                        className="show-games-btn"
                        onClick={() => this.requestGames({ team })}
                      >
                        Show Games
                      </button>
                      <p>
                        <span>Name: </span>
                        {team.full_name}
                      </p>
                      <p>
                        <span>Abbreviation: </span>
                        {team.abbreviation}
                      </p>
                      <p>
                        <span>City: </span>
                        {team.city}
                      </p>
                      <p>
                        <span>Conference: </span>
                        {team.conference}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <button className="load-more-btn" onClick={() => this.loadMore()}>
          <p>Load More</p>
        </button>
        <div
          className={`games-by-team ${cn({
            show: teamID !== 1
          })} `}
        >
          {games &&
            games.map(game => (
              <div className="game-card-wrapper">
                <p>[WIP]Game ID: {game.id}</p>
              </div>
            ))}
        </div>
      </Fragment>
    );
  }
}

export default TeamComponent;

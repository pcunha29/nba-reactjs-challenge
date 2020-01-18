import React, { Component, Fragment } from 'react';
import axios from 'axios';
import moment from 'moment';

import './games.scss';

var page = 1;
class GamesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gamesData: [],
      idGame: null
    };
  }

  componentDidMount() {
    axios
      .get(`/games`, {})
      .then(res => {
        this.setState({ gamesData: res.data.data });
        this.setState({ gamesMetaData: res.data.meta });
      })
      .catch(error => {
        console.log(error);
      });
  }

  newPage = () => {
    axios
      .get(`/games?page=${page}`, {})
      .then(res => {
        this.setState({ gamesData: res.data.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  nextPage = () => {
    const { gamesMetaData } = this.state;
    if (page < gamesMetaData.total_pages) {
      page += 1;
    }
    this.newPage();
  };
  previousPage = () => {
    if (page > 0) {
      page -= 1;
    }
    this.newPage();
  };

  render() {
    const { gamesData, gamesMetaData, idGame } = this.state;
    const clickedGame = gamesData[idGame];

    if (!gamesData || !gamesMetaData) {
      return null;
    }

    gamesData.sort((a, b) => {
      if (a.home_team.abbreviation > b.home_team.abbreviation) {
        return 1;
      }
      if (a.home_team.abbreviation < b.home_team.abbreviation) {
        return -1;
      }
      if ((a.home_team.abbreviation = b.home_team.abbreviation)) {
        if (a.visitor_team.abbreviation > b.visitor_team.abbreviation) {
          return 1;
        }
        if (a.visitor_team.abbreviation < b.visitor_team.abbreviation) {
          return -1;
        }
      }
      return 0;
    });

    return (
      <Fragment>
        <div className="games-wrapper center-xs">
          {gamesData &&
            gamesData.map((game, index) => (
              <button
                onClick={() => this.setState({ idGame: index })}
                className="game-vs"
              >
                <p className="team">{game.home_team.abbreviation}</p>
                <span>VS</span>
                <p className="team">{game.visitor_team.abbreviation}</p>
              </button>
            ))}
        </div>
        <div className="pages-handler">
          <button onClick={() => this.previousPage()}>PreviousPage</button>
          <p className="pagination">
            {page} / <span>{gamesMetaData.total_pages}</span>
          </p>
          <button onClick={() => this.nextPage()}>NextPage</button>
        </div>

        {gamesData && idGame !== null ? (
          <div className="games-card">
            <div>
              <div className="game-date">
                {moment(clickedGame.date).format('Do MMMM YYYY')}
              </div>
              <div className="game-teams">
                <div className="value">{clickedGame.home_team.full_name}</div>
                <div className="value">
                  {clickedGame.visitor_team.full_name}
                </div>
              </div>
              <div className="game-score">
                <div className="value">{clickedGame.home_team_score}</div>
                <div className="value">{clickedGame.visitor_team_score}</div>
              </div>
            </div>
          </div>
        ) : null}
      </Fragment>
    );
  }
}

export default GamesComponent;

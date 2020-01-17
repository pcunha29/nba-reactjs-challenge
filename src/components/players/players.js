import React, { Component, Fragment } from 'react';
import axios from 'axios';
import cn from 'classnames';

import './players.scss';

var page = 1;
class PlayerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playersData: [],
      idCard: 0
    };
  }

  componentDidMount() {
    axios
      .get(`/players`, {})
      .then(res => {
        this.setState({ playersData: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  newPage = () => {
    axios
      .get(`/players?page=${page}`, {})
      .then(res => {
        this.setState({ playersData: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  nextPage = () => {
    const totalPages = this.state.playersData.meta.total_pages;
    if (page < totalPages) {
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
    const { idCard } = this.state;
    const playersData = this.state.playersData.data;
    const playersMetaData = this.state.playersData.meta;

    if (!playersData) {
      return <div />;
    }

    playersData.sort((a, b) => {
      if (a.first_name > b.first_name) {
        return 1;
      }
      if (a.first_name < b.first_name) {
        return -1;
      }
      if ((a.first_name = b.first_name)) {
        if (a.last_name > b.last_name) {
          return 1;
        }
        if (a.last_name < b.last_name) {
          return -1;
        }
      }
      return 0;
    });

    return (
      <Fragment>
        <div className="players-wrapper center-xs">
          {playersData.map(player => (
            <button
              onClick={() => this.setState({ idCard: player.id })}
              className="player"
            >
              {player.first_name} {player.last_name}
            </button>
          ))}
        </div>
        <div className="pages-handler">
          <button onClick={() => this.previousPage()}>PreviousPage</button>
          <p className="pagination">
            {page} / <span>{playersMetaData.total_pages}</span>
          </p>
          <button onClick={() => this.nextPage()}>NextPage</button>
        </div>
        <div className="card-wrapper">
          {playersData && idCard !== 0 &&
            playersData.map(player => (
              <div
                className={`player-card ${cn({
                  show_card: player.id === idCard
                })} `}
              >
                  <p className="name">
                    {player.first_name} {player.last_name}
                  </p>
                  <div className="info-wrapper">
                    {player && player.position !== '' ? (
                      <h5 className="info">
                        <span>Position: </span> {player.position}
                      </h5>
                    ) : null}

                    {player && player.team.name !== '' ? (
                      <h5 className="info">
                        <span>Team name: </span>
                        {player.team.name}
                      </h5>
                    ) : null}

                    {player &&
                    player.height_feet !== null &&
                    player.height_inches !== null ? (
                      <h5 className="info">
                        <span>Height: </span>
                        {player.height_feet}
                        ft /{player.height_inches}''
                      </h5>
                    ) : null}
                  </div>
                </div>
            ))}
        </div>
      </Fragment>
    );
  }
}

export default PlayerComponent;

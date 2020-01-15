import React, { Component, Fragment } from 'react';
import axios from 'axios';

import './teams.scss';

var LIMIT = 5;

class TeamComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamData: []
    };
  }

  componentDidMount() {
    axios
      .get(`/teams`, {})
      .then(res => {
        this.setState({ teamData: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  loadMore = () => {
    LIMIT += 5;
    this.setState({ state: this.state });
  };

  render() {
    const teamData = this.state.teamData.data;

    if (!teamData) {
      return <div />;
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
      </Fragment>
    );
  }
}

export default TeamComponent;

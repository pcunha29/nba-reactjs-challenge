import React from 'react';

import TeamComponent from './components/teams/teams.js';
import PlayerComponent from './components/players/players.js';
import GamesComponent from './components/games/games.js';
import './layout/flexboxgrid.scss';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="row center-xs">
            <div className="col-xs-12 main-title">
              <h2>NBA ReactJs Challenge</h2>
            </div>
            <div className="col-xs-5 teams">
              <h5>Teams</h5>
              <span className="detail">(hover for more info)</span>
              <TeamComponent />
            </div>
            <div className="col-xs-5 players-games-wrapper">
              <div className="col-xs-12 players">
                <h5>Players</h5>
                <span className="detail">
                  (click player name for more info)
                </span>
                <PlayerComponent />
              </div>
              <div className="col-xs-12 games">
                <h5>Games</h5>
                <span className="detail">(click games name for more info)</span>
                <GamesComponent />
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;

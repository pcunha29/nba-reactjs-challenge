import React from 'react';


import TeamComponent from './components/teams/teams.js'
import PlayerComponent from './components/players/players.js'
import './layout/flexboxgrid.scss';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="row center-xs">
            <div className="col-xs-4 teams">
              <h5>Teams</h5>
              <TeamComponent/>
            </div>
            <div className="col-xs-4 players">
              <h5>Players</h5>
              <PlayerComponent/>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;

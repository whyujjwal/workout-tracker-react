import React, { useState } from 'react';
import RMSettings from './components/RMSettings';
import WorkoutTracker from './components/WorkoutTracker';
import Dashboard from './components/Dashboard';
import GlobalStyles from './styles/GlobalStyles';
import styled from 'styled-components';
import WorkoutHistory from './components/WorkoutHistory';

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 20px;
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
  
  button {
    background: var(--primary);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.2s;

    &:hover {
      background: var(--secondary);
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(1px);
    }
  }
`;

function App() {
  const [screen, setScreen] = useState('rm'); // options: 'rm', 'workout', 'dashboard', 'history'
  const [current1RM, setCurrent1RM] = useState({
    Squat: 150,
    Bench: 100,
    Deadlift: 180
  });
  const [workoutLog, setWorkoutLog] = useState([]);

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Navigation>
          <button onClick={() => setScreen('rm')}>1RM Settings</button>
          <button onClick={() => setScreen('workout')}>Workout Log</button>
          <button onClick={() => setScreen('dashboard')}>Dashboard</button>
          <button onClick={() => setScreen('history')}>History</button>
        </Navigation>
        <hr />
        {screen === 'rm' && <RMSettings current1RM={current1RM} setCurrent1RM={setCurrent1RM} />}
        {screen === 'workout' && <WorkoutTracker current1RM={current1RM} workoutLog={workoutLog} setWorkoutLog={setWorkoutLog} />}
        {screen === 'dashboard' && <Dashboard current1RM={current1RM} workoutLog={workoutLog} />}
        {screen === 'history' && <WorkoutHistory />}
      </AppContainer>
    </>
  );
}

export default App;

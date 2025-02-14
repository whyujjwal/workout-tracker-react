import React from 'react';

function Dashboard({ current1RM, workoutLog }) {
  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Current 1RMs</h3>
      <ul>
        <li>Squat: {current1RM.Squat}kg</li>
        <li>Bench: {current1RM.Bench}kg</li>
        <li>Deadlift: {current1RM.Deadlift}kg</li>
      </ul>
      <h3>Workout Log</h3>
      {workoutLog.length === 0 ? (
        <p>No workouts logged.</p>
      ) : (
        <ul>
          {workoutLog.map((entry, index) => (
            <li key={index}>
              {entry.date} – {entry.day}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;

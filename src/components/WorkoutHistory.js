import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import dbOperations from '../utils/database';

const HistoryContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const WorkoutCard = styled(motion.div)`
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const ExerciseTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  
  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
`;

function WorkoutHistory() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const loadWorkouts = async () => {
      const data = await dbOperations.getWorkouts();
      setWorkouts(data);
    };
    loadWorkouts();
  }, []);

  return (
    <HistoryContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Workout History</h2>
      {workouts.map((workout, idx) => (
        <WorkoutCard
          key={workout.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <h3>{workout.workout_day} - {workout.date}</h3>
          <ExerciseTable>
            <thead>
              <tr>
                <th>Exercise</th>
                <th>Scheme</th>
                <th>Sets x Reps</th>
                <th>Weight</th>
                <th>RPE</th>
              </tr>
            </thead>
            <tbody>
              {workout.exercises.map((exercise, index) => (
                <tr key={index}>
                  <td>{exercise.exercise_name}</td>
                  <td>{exercise.scheme}</td>
                  <td>{exercise.sets}x{exercise.reps}</td>
                  <td>{exercise.weight}kg</td>
                  <td>{exercise.rpe}</td>
                </tr>
              ))}
            </tbody>
          </ExerciseTable>
        </WorkoutCard>
      ))}
    </HistoryContainer>
  );
}

export default WorkoutHistory;

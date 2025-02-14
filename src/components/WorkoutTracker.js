import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const initialWorkoutPlan = {
  "Heavy Squat Day": {
    Main: [
      { exercise: "Back Squat", scheme: "5x4 @ 75-85%", type: "Main" },
      { exercise: "Pause Squat", scheme: "4x3 @ 70-75%", type: "Main" }
    ],
    Accessories: [
      { exercise: "Front Squat", scheme: "3x6 @ 65-70%", type: "Accessory" },
      { exercise: "Leg Press", scheme: "3x8 @ 70-75%", type: "Accessory" }
    ]
  },
  "Heavy Bench Day": {
    Main: [
      { exercise: "Bench Press", scheme: "5x4 @ 75-85%", type: "Main" },
      { exercise: "Spoto Press", scheme: "4x3 @ 70-75%", type: "Main" }
    ],
    Accessories: [
      { exercise: "Incline Bench", scheme: "3x6 @ 65-70%", type: "Accessory" },
      { exercise: "Weighted Dips", scheme: "3x6 BW+20kg", type: "Accessory" }
    ]
  },
  "Heavy Deadlift Day": {
    Main: [
      { exercise: "Deadlift", scheme: "5x3 @ 80-90%", type: "Main" },
      { exercise: "Deficit Deadlift", scheme: "4x2 @ 75-80%", type: "Main" }
    ],
    Accessories: [
      { exercise: "Rack Pulls", scheme: "3x5 @ 85-90%", type: "Accessory" },
      { exercise: "Barbell Row", scheme: "3x8 @ 70-75%", type: "Accessory" }
    ]
  },
  "Dynamic Upper Day": {
    Main: [
      { exercise: "Speed Bench", scheme: "10x3 @ 55-60%", type: "Main" },
      { exercise: "Floor Press", scheme: "4x4 @ 70-75%", type: "Main" }
    ],
    Accessories: [
      { exercise: "Larsen Press", scheme: "3x6 @ 65-70%", type: "Accessory" },
      { exercise: "Skull Crushers", scheme: "3x8 @ 60-65%", type: "Accessory" }
    ]
  },
  "Dynamic Lower Day": {
    Main: [
      { exercise: "Speed Squat", scheme: "10x2 @ 60-65%", type: "Main" },
      { exercise: "Box Squat", scheme: "4x4 @ 70-75%", type: "Main" }
    ],
    Accessories: [
      { exercise: "Bulgarian Split Squat", scheme: "3x6/leg @ 60-65%", type: "Accessory" },
      { exercise: "Leg Curl", scheme: "3x12 @ 70-75%", type: "Accessory" }
    ]
  },
  "Accessory Day": {
    Main: [
      { exercise: "Pull-Ups", scheme: "4x6 BW+10kg", type: "Main" },
      { exercise: "Overhead Press", scheme: "4x6 @ 65-70%", type: "Main" }
    ],
    Accessories: [
      { exercise: "Tricep Pushdown", scheme: "3x12 @ 70-75%", type: "Accessory" },
      { exercise: "Preacher Curl", scheme: "3x8 @ 60-65%", type: "Accessory" }
    ]
  }
};

// Styled Components
const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled(motion.h2)`
  text-align: center;
  color: var(--primary);
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const SelectContainer = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
`;

const StyledSelect = styled.select`
  padding: 10px 15px;
  font-size: 1rem;
  border-radius: 8px;
  background: var(--surface);
  min-width: 200px;
`;

const WorkoutTable = styled(motion.table)`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: var(--surface);
  margin-top: 20px;

  th {
    background: var(--primary);
    color: white;
    padding: 15px;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.9rem;
    letter-spacing: 0.05em;
  }

  td {
    padding: 12px;
    border-bottom: 1px solid #eef2f7;
  }

  tr:hover {
    background: #f8fafc;
  }
`;

const Input = styled.input`
  width: ${props => props.type === "number" ? "80px" : "120px"};
  text-align: center;
  padding: 8px;
  border-radius: 4px;
  border: 2px solid #eef2f7;
  transition: all 0.2s;

  &:focus {
    border-color: var(--secondary);
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }
`;

const SaveButton = styled(motion.button)`
  background: var(--primary);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 20px;
  transition: all 0.2s;

  &:hover {
    background: var(--secondary);
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const ExerciseRow = styled(motion.tr)`
  &:nth-child(even) {
    background: #f8fafc;
  }
`;

const ExerciseInputs = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const tableVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

function WorkoutTracker({ current1RM, workoutLog, setWorkoutLog }) {
  const [selectedDay, setSelectedDay] = useState("Heavy Squat Day");
  const [inputs, setInputs] = useState({}); // track input per exercise

  const saveWorkout = async () => {
    const entry = {
      date: new Date().toLocaleDateString(),
      day: selectedDay,
      inputs
    };
    
    try {
      await dbOperations.saveWorkout(entry);
      setWorkoutLog([...workoutLog, entry]);
      alert("Workout logged successfully!");
      setInputs({});
    } catch (error) {
      alert("Error saving workout: " + error.message);
    }
  };

  const handleExerciseInput = (exercise, field, value) => {
    setInputs(prev => ({
      ...prev,
      [exercise]: {
        ...prev[exercise],
        [field]: value
      }
    }));
  };

  return (
    <Container>
      <Header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Workout Tracker
      </Header>
      
      <SelectContainer>
        <label htmlFor="daySelect">
          <strong>Select Workout:</strong>
        </label>
        <StyledSelect
          id="daySelect"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          {Object.keys(initialWorkoutPlan).map((day, index) => (
            <option key={day} value={day}>
              {`Day ${index + 1}: ${day}`}
            </option>
          ))}
        </StyledSelect>
      </SelectContainer>

      <WorkoutTable
        as={motion.table}
        variants={tableVariants}
        initial="hidden"
        animate="visible"
      >
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Scheme</th>
            <th>Weight Used</th>
            <th>RPE</th>
          </tr>
        </thead>
        <tbody>
          {initialWorkoutPlan[selectedDay].Main.map((ex, index) => (
            <ExerciseRow
              key={index}
              variants={rowVariants}
            >
              <td>{ex.exercise}</td>
              <td>{ex.scheme}</td>
              <td>
                <ExerciseInputs>
                  <Input
                    type="number"
                    placeholder="Sets"
                    value={inputs[ex.exercise]?.sets || ""}
                    onChange={(e) => handleExerciseInput(ex.exercise, 'sets', e.target.value)}
                    style={{ width: '60px' }}
                  />
                  <span>x</span>
                  <Input
                    type="number"
                    placeholder="Reps"
                    value={inputs[ex.exercise]?.reps || ""}
                    onChange={(e) => handleExerciseInput(ex.exercise, 'reps', e.target.value)}
                    style={{ width: '60px' }}
                  />
                  <Input
                    type="number"
                    placeholder="kg"
                    value={inputs[ex.exercise]?.weight || ""}
                    onChange={(e) => handleExerciseInput(ex.exercise, 'weight', e.target.value)}
                    style={{ width: '80px' }}
                  />
                </ExerciseInputs>
              </td>
              <td>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  placeholder="RPE"
                  value={inputs[ex.exercise]?.rpe || ""}
                  onChange={(e) => handleExerciseInput(ex.exercise, 'rpe', e.target.value)}
                  style={{ width: '60px' }}
                />
              </td>
            </ExerciseRow>
          ))}
          {initialWorkoutPlan[selectedDay].Accessories.map((ex, index) => (
            <ExerciseRow
              key={index + 100}
              variants={rowVariants}
            >
              <td>{ex.exercise}</td>
              <td>{ex.scheme}</td>
              <td>
                <ExerciseInputs>
                  <Input
                    type="number"
                    placeholder="Sets"
                    value={inputs[ex.exercise]?.sets || ""}
                    onChange={(e) => handleExerciseInput(ex.exercise, 'sets', e.target.value)}
                    style={{ width: '60px' }}
                  />
                  <span>x</span>
                  <Input
                    type="number"
                    placeholder="Reps"
                    value={inputs[ex.exercise]?.reps || ""}
                    onChange={(e) => handleExerciseInput(ex.exercise, 'reps', e.target.value)}
                    style={{ width: '60px' }}
                  />
                  <Input
                    type="number"
                    placeholder="kg"
                    value={inputs[ex.exercise]?.weight || ""}
                    onChange={(e) => handleExerciseInput(ex.exercise, 'weight', e.target.value)}
                    style={{ width: '80px' }}
                  />
                </ExerciseInputs>
              </td>
              <td>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  placeholder="RPE"
                  value={inputs[ex.exercise]?.rpe || ""}
                  onChange={(e) => handleExerciseInput(ex.exercise, 'rpe', e.target.value)}
                  style={{ width: '60px' }}
                />
              </td>
            </ExerciseRow>
          ))}
        </tbody>
      </WorkoutTable>

      <div style={{ textAlign: 'center' }}>
        <SaveButton
          as={motion.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={saveWorkout}
        >
          Save Workout
        </SaveButton>
      </div>
    </Container>
  );
}

export default WorkoutTracker;

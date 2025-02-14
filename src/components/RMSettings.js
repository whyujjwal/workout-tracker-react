import React, { useState } from 'react';

function RMSettings({ current1RM, setCurrent1RM }) {
  const [squat, setSquat] = useState(current1RM.Squat);
  const [bench, setBench] = useState(current1RM.Bench);
  const [deadlift, setDeadlift] = useState(current1RM.Deadlift);

  const updateSettings = () => {
    setCurrent1RM({ Squat: squat, Bench: bench, Deadlift: deadlift });
    alert("1RM settings updated");
  };

  return (
    <div>
      <h2>1RM Settings</h2>
      <div>
        <label>
          Squat 1RM:
          <input type="number" value={squat} onChange={(e) => setSquat(Number(e.target.value))} />
        </label>
      </div>
      <div>
        <label>
          Bench 1RM:
          <input type="number" value={bench} onChange={(e) => setBench(Number(e.target.value))} />
        </label>
      </div>
      <div>
        <label>
          Deadlift 1RM:
          <input type="number" value={deadlift} onChange={(e) => setDeadlift(Number(e.target.value))} />
        </label>
      </div>
      <button onClick={updateSettings}>Update 1RMs</button>
    </div>
  );
}

export default RMSettings;

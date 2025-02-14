const DB_NAME = 'workoutDB';
const DB_VERSION = 1;

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Create workouts store
      if (!db.objectStoreNames.contains('workouts')) {
        const workoutStore = db.createObjectStore('workouts', { 
          keyPath: 'id', 
          autoIncrement: true 
        });
        workoutStore.createIndex('date', 'date');
      }

      // Create exercises store
      if (!db.objectStoreNames.contains('exercises')) {
        const exerciseStore = db.createObjectStore('exercises', {
          keyPath: 'id',
          autoIncrement: true
        });
        exerciseStore.createIndex('workout_id', 'workout_id');
      }
    };
  });
};

const dbOperations = {
  saveWorkout: async (workoutData) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['workouts', 'exercises'], 'readwrite');
      
      // Save workout
      const workoutStore = transaction.objectStore('workouts');
      const workoutRequest = workoutStore.add({
        date: workoutData.date,
        workout_day: workoutData.day,
        created_at: new Date().toISOString()
      });

      workoutRequest.onsuccess = () => {
        const workout_id = workoutRequest.result;
        const exerciseStore = transaction.objectStore('exercises');
        
        // Save exercises
        const exercises = Object.entries(workoutData.inputs).map(([name, data]) => ({
          workout_id,
          exercise_name: name,
          scheme: data.scheme,
          sets_completed: parseInt(data.sets),
          reps_completed: parseInt(data.reps),
          weight_used: parseFloat(data.weight),
          rpe: parseInt(data.rpe)
        }));

        Promise.all(exercises.map(exercise => 
          new Promise((resolve, reject) => {
            const request = exerciseStore.add(exercise);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
          })
        ))
        .then(() => resolve(workout_id))
        .catch(reject);
      };

      workoutRequest.onerror = () => reject(workoutRequest.error);
    });
  },

  getWorkouts: async () => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['workouts', 'exercises'], 'readonly');
      const workoutStore = transaction.objectStore('workouts');
      const exerciseStore = transaction.objectStore('exercises');
      
      const workouts = [];
      
      workoutStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          const workout = cursor.value;
          
          // Get exercises for this workout
          const exerciseIndex = exerciseStore.index('workout_id');
          exerciseIndex.getAll(cursor.value.id).onsuccess = (e) => {
            workout.exercises = e.target.result;
            workouts.push(workout);
          };
          
          cursor.continue();
        } else {
          resolve(workouts);
        }
      };
    });
  }
};

export default dbOperations;

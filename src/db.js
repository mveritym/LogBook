import firebase from 'firebase';
import union from 'lodash/union';

const config = {
  apiKey: "AIzaSyB3E0ke8eVwu67tIiF7Iab2V_yW0vDXmZ0",
  authDomain: "strongcurves-43799.firebaseapp.com",
  databaseURL: "https://strongcurves-43799.firebaseio.com",
  storageBucket: "strongcurves-43799.appspot.com"
};

firebase.initializeApp(config);
const database = firebase.database();

const workoutsRef = database.ref('workouts');
const exercisesRef = database.ref('exercises');

const getWorkout = (id) => workoutsRef.child(id).once('value', snapshot => snapshot.val());
const getWorkouts = () => workoutsRef.once('value', snapshot => snapshot.val());

export default {
  getWorkouts,
  getWorkout,
  createWorkout: (workout) => {
    return workoutsRef.push(workout).key;
  },
  getExercises: () => exercisesRef.once('value', snapshot => snapshot.val()),
  getExercise: (id) => exercisesRef.child(id).once('value', snapshot => snapshot.val()),
  createExercise: (exercise) => {
    return exercisesRef.push(exercise).key;
  },
  addExercisesToWorkout: async (id, newExercises) => {
    const workout = (await getWorkout(id)).val();
    const exercises = union(workout.exercises, newExercises);
    workoutsRef.child(id).update({ exercises });
    return {
      ...workout,
      id,
      exercises
    };
  }
};

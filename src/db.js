import firebase from 'firebase';

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

const createWorkout = (workout) => workoutsRef.push(workout).key;
const getWorkout = (id) => workoutsRef.child(id).once('value', snapshot => snapshot.val());
const getWorkouts = () => workoutsRef.once('value', snapshot => snapshot.val());

const createExercise = (exercise) => exercisesRef.push(exercise).key;
const getExercises = () => exercisesRef.once('value', snapshot => snapshot.val());
const getExercise = (id) => exercisesRef.child(id).once('value', snapshot => snapshot.val());
const addExercisesToWorkout = (id, exercises) => workoutsRef.child(id).update({ exercises });

export default {
  getWorkouts,
  getWorkout,
  createWorkout,
  getExercises,
  getExercise,
  createExercise,
  addExercisesToWorkout
};

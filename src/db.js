import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyB3E0ke8eVwu67tIiF7Iab2V_yW0vDXmZ0",
  authDomain: "strongcurves-43799.firebaseapp.com",
  databaseURL: "https://strongcurves-43799.firebaseio.com",
  storageBucket: "strongcurves-43799.appspot.com"
};

firebase.initializeApp(config);
const database = firebase.database();

const exercisesRef = database.ref('exercises');

export default {
  createExercise: (exercise) => {
    return exercisesRef.push(exercise).key;
  },
  getWorkouts: () => database.ref('workouts').once('value', snapshot => snapshot.val())
};

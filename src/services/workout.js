import db from '../db';
import { getExercise, getExercisesFromIDs } from './exercise';

export const getWorkout = async (id) => {
  const workout = (await db.getWorkout(id)).val();
  const exercises = workout.exercises && workout.exercises.map(id => getExercise(id));
  return {
    ...workout,
    exercises: exercises || [],
    id
  };
};

export const getAllWorkouts = async () => {
  const workouts = (await db.getWorkouts()).val();
  return Object.keys(workouts).map(id => {
    const workout = workouts[id];
    const exercises = getExercisesFromIDs(workout.exercises);
    return {
      ...workout,
      exercises,
      id
    };
  });
};

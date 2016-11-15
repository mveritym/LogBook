import db from '../db';
import union from 'lodash/union';
import { getExercise, getExercisesFromIDs } from './exercise';

export const getWorkout = async (id) => {
  const workout = (await db.getWorkout(id)).val();
  const exercises = await getExercisesFromWorkout(workout);
  return {
    ...workout,
    exercises,
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

export const createWorkout = (workout) => {
  const id = db.createWorkout(workout);
  return {...workout, id};
};

export const addExercisesToWorkout = async (id, newExercises) => {
  const workout = await getWorkout(id);
  const exerciseIDs = union(getExerciseIDsFromWorkout(workout), newExercises);
  const exercises = union(workout.exercises, await getExercisesFromIDs(newExercises));
  await db.addExercisesToWorkout(id, exerciseIDs);
  return {
    ...workout,
    exercises,
    id
  };
};

const getExercisesFromWorkout = async (workout) => {
  const exercises = workout.exercises && await Promise.all(workout.exercises.map(id => getExercise(id)));
  return exercises || [];
};

const getExerciseIDsFromWorkout = (workout) => {
  const exercises = workout.exercises && workout.exercises.map(({ id }) => id);
  return exercises || [];
};

import db from '../db';

export const getExercise = async (id) => {
  const exercise = (await db.getExercise(id)).val();
  return {...exercise, id};
};

export const getExercisesFromIDs = async (ids) => {
  return ids ? await Promise.all(ids.map(id => getExercise(id))) : [];
};

export const getAllExercises = async () => {
  const exercises = (await db.getExercises()).val();
  return Object.keys(exercises).map(id => ({
    ...exercises[id],
    id
  }));
};

export const createExercise = (exercise) => {
  const id = db.createExercise(exercise);
  return {...exercise, id};
};

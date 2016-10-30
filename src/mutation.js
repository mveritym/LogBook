import {
  GraphQLObjectType,
  GraphQLInt
} from 'graphql';
import { ExerciseType, ExerciseInputType } from './types/exerciseType';
import { WorkoutType, WorkoutInputType } from './types/workoutType';
import db from './db';

const mutation = new GraphQLObjectType({
  name: 'StrongCurvesMutations',
  description: 'Add/delete exercises and workouts',
  fields: () => ({
    createWorkout: {
      type: WorkoutType,
      description: 'Add a new workout',
      args: {
        workout: { type: WorkoutInputType }
      },
      resolve: (value, { workout }) => {
        const id = db.createWorkout(workout);
        return {...workout, id};
      }
    },
    createExercise: {
      type: ExerciseType,
      description: 'Add a new exercise',
      args: {
        exercise: { type: ExerciseInputType }
      },
      resolve: (value, { exercise }) => {
        const id = db.createExercise(exercise);
        return {...exercise, id};
      }
    }
  }),
});

export default mutation;

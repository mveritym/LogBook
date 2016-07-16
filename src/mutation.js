import {
  GraphQLObjectType,
  GraphQLInt
} from 'graphql';
import { ExerciseType, ExerciseInputType } from './types/exerciseType';
import generateUniqId from './utils/unique-generator';
import db from './db';

const mutation = new GraphQLObjectType({
  name: 'StrongCurvesMutations',
  description: 'Add/delete exercises and workouts',
  fields: () => ({
    createExercise: {
      type: ExerciseType,
      description: 'Add an exercise with a unique ID',
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

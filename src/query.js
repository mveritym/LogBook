import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString
} from 'graphql';

import db from './db';
import { WorkoutType } from './types/workoutType';
import { ExerciseType } from './types/exerciseType';
import { getExercise, getAllExercises } from './services/exercise';
import { getWorkout, getAllWorkouts } from './services/workout';

const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    workouts: {
      type: new GraphQLList(WorkoutType),
      resolve() {
        return getAllWorkouts();
      }
    },
    workout: {
      type: WorkoutType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, { id }) {
        return getWorkout(id);
      }
    },
    exercises: {
      type: new GraphQLList(ExerciseType),
      resolve() {
        return getAllExercises();
      }
    },
    exercise: {
      type: ExerciseType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, { id }) {
        return getExercise(id);
      }
    }
  }
});

export default query;

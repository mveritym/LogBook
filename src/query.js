import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString
} from 'graphql';

import db from './db';
import { WorkoutType } from './types/workoutType';
import { ExerciseType } from './types/exerciseType';

const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    workouts: {
      type: new GraphQLList(WorkoutType),
      resolve() {
        return db.getWorkouts().then(snapshot => {
          const workouts = snapshot.val();
          return Object.keys(workouts).map(id => ({
            ...workouts[id],
            id
          }));
        });
      }
    },
    workout: {
      type: WorkoutType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, { id }) {
        return db.getWorkout(id).then(snapshot => ({...snapshot.val(), id}));
      }
    },
    exercises: {
      type: new GraphQLList(ExerciseType),
      resolve() {
        return db.getExercises().then(snapshot => {
          const exercises = snapshot.val();
          return Object.keys(exercises).map(id => ({
            ...exercises[id],
            id
          }));
        });
      }
    },
    exercise: {
      type: ExerciseType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, { id }) {
        return db.getExercise(id).then(snapshot => ({...snapshot.val(), id}));
      }
    }
  }
});

export default query;

import {
  GraphQLObjectType,
  GraphQLList
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
          return snapshot.val().slice(1);
        });
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
    }
  }
});

export default query;

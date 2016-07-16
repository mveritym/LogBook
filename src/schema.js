import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList
} from 'graphql';
import db from './db';

import { WorkoutType } from './types';
import generateUniqId from './utils/unique-generator';

const LogBookSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      workouts: {
        type: new GraphQLList(WorkoutType),
        resolve() {
          return db.getWorkouts().then(snapshot => {
            return snapshot.val().slice(1);
          });
        }
      }
    }
  })
});

export default LogBookSchema;

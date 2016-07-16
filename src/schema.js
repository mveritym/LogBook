import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql';

import { WorkoutType } from './types';
import db from './db';

const generateUniqId = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
};

const LogBookSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        }
      },
      workouts: {
        type: new GraphQLList(WorkoutType),
        resolve() {
          return db.getWorkouts().then(snapshot => {
            const workouts = snapshot.val().slice(1);
            return workouts.map(workout => ({
              ...workout,
              id: generateUniqId()
            }));
          });
        }
      }
    }
  })
});

export default LogBookSchema;

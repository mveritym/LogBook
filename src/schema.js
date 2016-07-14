import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';
import db from './db';

const WorkoutType = new GraphQLObjectType({
  name: 'Workout',
  description: 'A workout',
  fields: () => ({
    id: {
      type: GraphQLString,
      description: 'unique id of the workout'
    },
    exercises: {
      type: new GraphQLList(GraphQLString),
      description: 'list of ids of the exercises in the workout'
    },
    letter: {
      type: GraphQLString,
      description: 'letter of the workout (A, B or C)'
    },
    stage: {
      type: GraphQLString,
      description: 'stage number of the workout (1, 2 or 3)'
    }
  })
});

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

import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString
} from 'graphql';

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

export default WorkoutType;

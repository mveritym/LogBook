import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

const sharedFields = {
  exercises: {
    type: new GraphQLList(GraphQLString),
    description: 'list of ids of the exercises in the workout'
  },
  letter: {
    type: new GraphQLNonNull(GraphQLString),
    description: 'letter of the workout (A, B or C)'
  },
  stage: {
    type: new GraphQLNonNull(GraphQLString),
    description: 'stage number of the workout (1, 2 or 3)'
  }
};

export const WorkoutInputType = new GraphQLInputObjectType({
  name: 'WorkoutInput',
  description: 'A workout',
  fields: () => sharedFields
});

export const WorkoutType = new GraphQLObjectType({
  name: 'Workout',
  description: 'A workout',
  fields: () => ({
    ...sharedFields,
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'unique id of the workout'
    }
  })
});

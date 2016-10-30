import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from 'graphql';

const sharedFields = {
  name: {
    type: new GraphQLNonNull(GraphQLString),
    description: 'the name of the exercise'
  },
  numSets: {
    type: new GraphQLNonNull(GraphQLInt),
    description: 'how many sets of the exercise to perform'
  },
  maxReps: {
    type: GraphQLInt,
    description: 'the maximum number of reps to perform'
  },
  minReps: {
    type: GraphQLInt,
    description: 'the minimum number of reps to perform'
  },
  minDuration: {
    type: GraphQLInt,
    description: 'the minimum amount of time to perform the exercise (in seconds)'
  },
  maxDuration: {
    type: GraphQLInt,
    description: 'the maximum amount of time to perform the exercise (in seconds)'
  }
};

export const ExerciseInputType = new GraphQLInputObjectType({
  name: 'ExerciseInput',
  description: 'An exercise',
  fields: () => sharedFields
});

export const ExerciseType = new GraphQLObjectType({
  name: 'Exercise',
  description: 'An exercise',
  fields: () => ({
    ...sharedFields,
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'the unique ID of the workout'
    }
  })
});

import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';
import { ExerciseType } from './exerciseType';

const sharedFields = {
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
    exercises: {
      type: new GraphQLList(ExerciseType),
      description: 'the exercises in the workout'
    },
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'unique id of the workout'
    }
  })
});

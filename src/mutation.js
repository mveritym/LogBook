import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import { ExerciseType, ExerciseInputType } from './types/exerciseType';
import { WorkoutType, WorkoutInputType } from './types/workoutType';

import { createWorkout, addExercisesToWorkout } from './services/workout';
import { createExercise } from './services/exercise';

const mutation = new GraphQLObjectType({
  name: 'StrongCurvesMutations',
  description: 'Add/delete exercises and workouts',
  fields: () => ({
    createWorkout: {
      type: WorkoutType,
      description: 'Add a new workout',
      args: {
        workout: { type: WorkoutInputType }
      },
      resolve: (value, { workout }) => createWorkout(workout)
    },
    createExercise: {
      type: ExerciseType,
      description: 'Add a new exercise',
      args: {
        exercise: { type: ExerciseInputType }
      },
      resolve: (value, { exercise }) => createExercise(exercise)
    },
    addExercisesToWorkout: {
      type: WorkoutType,
      description: 'Add exercises to a workout',
      args: {
        id: { type: GraphQLString },
        exercises: { type: new GraphQLList(GraphQLString) }
      },
      resolve: (value, { id, exercises }) => addExercisesToWorkout(id, exercises)
    }
  }),
});

export default mutation;

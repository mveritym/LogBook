import { GraphQLSchema } from 'graphql';
import query from './query';
import mutation from './mutation';

const LogBookSchema = new GraphQLSchema({
  query,
  mutation
});

export default LogBookSchema;

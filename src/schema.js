import { GraphQLSchema } from 'graphql';
import query from './query';

const LogBookSchema = new GraphQLSchema({
  query
});

export default LogBookSchema;

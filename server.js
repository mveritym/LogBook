import express from 'express';
import graphqlHTTP from 'express-graphql';
import LogBookSchema from './src/schema';

const app = express();

app.use('/', graphqlHTTP({
  schema: LogBookSchema,
  graphiql: true
}));

app.listen(3001, () => {
  console.log('LogBook running at http://localhost:3001');
});

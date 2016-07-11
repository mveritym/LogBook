import express from 'express';
import graphqlHTTP from 'express-graphql';

const app = express();

app.use('/', (req, res) => {
  res.send("LogBook running");
});

app.use('/graphql', graphqlHTTP({
  // schema: MyGraphQLSchema,
  graphiql: true
}));

app.listen(3001, () => {
  console.log('LogBook running at http://localhost:3001');
});

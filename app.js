import Express from 'express';
const app = Express();
// todo :: take it from .env
const port = 9000; 



app.use(function (req, res, next) {
  res.status(404).json({message: "Path not exist."});
})

app.listen(port, () => console.log(`App start on port ${port}!`));
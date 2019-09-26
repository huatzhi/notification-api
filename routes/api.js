import Express from 'express';
const rootRouter = Express.Router();

rootRouter.post('/register', async (req, res) => {
  res.json({message: "r1 reached"});
});

rootRouter.get('/commonstudents', async (req, res) => {
  res.json({message: "r2 reached"});
});

rootRouter.post('/suspend', async (req, res) => {
  res.json({message: "r3 reached"});
});

rootRouter.post('/retrievefornotifications', async (req, res) => {
  res.json({message: "r4 reached"});
});

export {rootRouter};
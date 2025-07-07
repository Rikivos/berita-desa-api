// api/index.js
import express from 'express';
import dotenv from 'dotenv';
import { connectMongo } from '../src/infrastructure/mongodb/mongoClient.js';
import userRoutes from '../src/interfaces/http/routes/userRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);

await connectMongo();

const PORT = process.env.PORT || 6000;
connectMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
});

export default app;
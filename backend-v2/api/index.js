// api/index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import corsOptions from '../src/config/cors.js';
import { connectMongo } from '../src/infrastructure/mongodb/mongoClient.js';
import userRoutes from '../src/interfaces/http/routes/userRoutes.js';
import categoryRoutes from '../src/interfaces/http/routes/categoryRoutes.js';
import postRoutes from '../src/interfaces/http/routes/postRoutes.js';
import commentRoutes from '../src/interfaces/http/routes/commentRoutes.js';

dotenv.config();
const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API Backend Express is Running ✅' });
});


app.use('/api', categoryRoutes, userRoutes, postRoutes, commentRoutes);

// await connectMongo();
const PORT = process.env.PORT || 3000;
connectMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
});

export default app;
import 'dotenv/config';
import app from "./app/app.js";
import { env } from "./env.js";
import connectDB from './app/common/config/db.js';

const startServer = async () => {
  const PORT = +env.PORT || 5000;
  const ENV = env.ENV;

  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT} on ${ENV} environment`);
  });
};

startServer()
  .catch(err => {
    console.log("Failed to start server", err);
    process.exit(1);
  });
import app from './app';
import { APP } from './config/env.config';

const PORT = APP.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${APP.NODE_ENV} mode`);
});

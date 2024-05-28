/*import app from './app.js';

app.listen = (3500);
console.log('Server on port', 3500);*/

import app from './app.js';
import { connectDB } from './db.js';

connectDB();
const appPort = 3500;
app.listen(appPort, () => {
  console.log(`App listening at http://localhost:${appPort}`);
});
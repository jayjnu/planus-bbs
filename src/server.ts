import app from './app';
import * as serverConf from './config/server';

app.listen(serverConf.port, () => {
  console.log(`server is up and running on port ${serverConf.host}:${serverConf.port}`);
});

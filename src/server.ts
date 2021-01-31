import app from "./app";
import sequelize from "./db/database"
import {config} from 'dotenv';
config();

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    sequelize.authenticate();
    console.log(`[Server] : Server is running at http://yourang-server.link:${PORT}`);
});

module.exports = app;
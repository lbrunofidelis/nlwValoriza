import "reflect-metadata";
import express from "express";

import "./database";

// @types/express
const app = express();



app.listen(3001, () => { console.log('Server is running on port 3001') } );

import express from "express";
import api from ".."; 

function createApp(): express.Express {
  
    const cors = require("cors");
    const app = express(); 

    app.use(express.json());
    app.use(cors());

    app.use('/api', api);


    return app;
}

export default createApp;
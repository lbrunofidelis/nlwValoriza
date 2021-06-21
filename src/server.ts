import express from "express";

// @types/express
const app = express();

app.get("/test", (request, response) => {
    return response.send("Okayz");
});

app.listen(3001, () => { console.log('Server is running on port 3001') } );

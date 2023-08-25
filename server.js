import express from 'express'

const app = express();

const port = 5100;

app.listen(port, () =>{
    console.log(`server is running on PORT ${port}`);
})
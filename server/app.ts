import express from 'express';
import cors from 'cors';
import { connectDB } from './mongodb/connect.db';

const app = express();

try {
    await connectDB();
}
catch (e) {
    console.error(e);
    process.exit(1)
}

app.get('/', (_, res) => {
    res.send("App is up and running!")
})

app.listen(8080, () => {
    console.log("listening on http://localhost:"+process.env.PORT)
})
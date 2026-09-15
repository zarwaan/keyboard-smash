import express from 'express';
import cors from 'cors';
import { connectDB } from './mongodb/connect.db';
import authRouter from './routes/auth.route';
import session from 'express-session';
import { KSEnv } from './envConfig';

const app = express();
app.use(express.json())

app.use(session({
    secret: KSEnv.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 30
    }
}));

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

app.use('/auth',authRouter)

app.listen(8080, () => {
    console.log("listening on http://localhost:"+KSEnv.PORT)
})
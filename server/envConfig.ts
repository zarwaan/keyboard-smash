import * as dotenv from 'dotenv';

dotenv.config();

if(!process.env.SESSION_SECRET){
    console.error("No session secret provided!")
    process.exit(1);
}

export const KSEnv = process.env
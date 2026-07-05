import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get('/health', (req,res) => {
    res.json('running...')
})

const port = process.env.PORT

app.listen(port, () => {
    console.log('server listening on port', port)
})
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import mongoose from 'mongoose';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json({limit : "50mb", extended : true}))

app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)

app.get("/", async (req, res) => {
    res.send("Hello From Dalle-E")
})

mongoose.set("strictQuery", true)
mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(8080, ()=> {
        console.log('Server is listening on port 8080 and connected to Database')
    })
}).catch((err) => {console.log(err)})




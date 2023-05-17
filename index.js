import express from "express";
import * as dotenv from "dotenv";
import { getAll, getOnById, create, createImage, updatedById, deleteByID } from './controllers/planets.js';
import { logIn, signUp } from "./controllers/users.js";
import morgan from "morgan";
import multer from "multer";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });
dotenv.config();
const app = express();
const { PORT } = process.env;
app.use(express.json());
app.use(morgan('dev'));
app.get('/api/planets', getAll);
app.get('/api/planets/:id', getOnById);
app.post('/api/planets/', create);
app.post('/api/planets/:id/image', upload.single("image"), createImage);
app.post("/api/users/login", logIn);
app.post("/api/users/signup", signUp);
app.put('/api/planets/:id', updatedById);
app.delete('/api/planets/:id', deleteByID);
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

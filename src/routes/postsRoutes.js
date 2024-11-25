import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOption = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200 
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage});

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOption));

    //Rota para buscar todos os posts
    app.get("/posts", listarPosts);
    //Rota para criar um post
    app.post("/posts", postarNovoPost);
    //Rota para upload de imagem
    app.post("/upload", upload.single("imagem"), uploadImagem);
    //Rota para atualizar id da imagem
    app.put("/upload/:id", atualizarNovoPost);
}

export default routes;
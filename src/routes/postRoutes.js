import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, NewPost, uploadImagem, AtualizarNovoPost } from "../controllers/postsControllers.js";

const corsOptions = {
    origin: "http://127.0.0.1:8000",
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ dest: "./uploads" , storage}) // Multer vai criar esse arquivo

const routes = (app) => {
    app.use(express.json()); // Configura o middleware para interpretar o corpo das requisições em JSON
    app.use(cors(corsOptions));

    app.get("/posts", listarPosts); // Define uma rota GET no caminho "/posts" para retornar todos os posts
    app.post("/posts", NewPost); // Define uma rota POST no caminho "/posts" para enviar um arquivo ao bd
    app.post("/upload", upload.single("imagem"), uploadImagem); // Define uma rota POST no caminho "/upload" para enviar um arquivo ao bd
    app.put("/upload/:id", AtualizarNovoPost) // Define uma rota PUT no caminho "/upload/id da imagem" para atualizar um arquivo no bd
};

export default routes; //exportar routes


import fs from "fs";
import { getTodosPosts, CriarPost, AtualizarPost } from "../models/postsModels.js";
import gerarDescricaoComGemini from "../service/gemini_service.js";

export async function listarPosts(req, res) {
    const posts = await getTodosPosts(); // Obtém os posts chamando a função getTodosPosts
    res.status(200).json(posts); // Responde à requisição com os posts em formato JSON e status 200 (OK))
};

export async function NewPost(req, res) {
    const novaPostagem = req.body; // Pegar dados do corpo da página

    try {
        const postCriado = await CriarPost(novaPostagem); // Acionar função CriarPost(dados da página)

        res.status(200).json(postCriado); // Retornar o post criado
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
};

export async function uploadImagem(req, res) {
    const novaPostagem = req.body; // Pegar dados do corpo da página

    try {
        const postCriado = await CriarPost(novaPostagem); // Acionar função CriarPost(dados da página)
        const imagematualizada = `uploads/${postCriado.insertedId}.jpg`;
        fs.renameSync(req.file.path, imagematualizada);

        res.status(200).json(postCriado); // Retornar o post criado
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
};

export async function AtualizarNovoPost(req, res) {
    const id = req.params.id; // Pegar dados do corpo da página
    const url_imagem = `http://127.0.0.1:3000/${id}.jpg`;

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.jpg`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);
        const post = {
            descricao: descricao,
            img_url: url_imagem,
            alt: req.body.alt
        };
        const postCriado = await AtualizarPost(id, post); // Acionar função CriarPost(dados da página)

        res.status(200).json(postCriado); // Retornar o post criado
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
};
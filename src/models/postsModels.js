import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js";

// Conecta ao banco de dados usando a string de conexão especificada na variável de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona que obtém todos os documentos da coleção "posts" do banco de dados
export async function getTodosPosts() {
    const db = conexao.db("Imersão-Instabytes"); // Seleciona o banco de dados "Imersão-Instabytes"
    const colecao = db.collection("posts"); // Seleciona a coleção "posts" dentro do banco de dados
    return colecao.find().toArray(); // Retorna todos os documentos da coleção como um array
};

export async function CriarPost(novoPost) { // Função que vai utlizar os dados da página
    const db = conexao.db("Imersão-Instabytes"); 
    const colecao = db.collection("posts"); 

    return colecao.insertOne(novoPost); //Inserir os dados no banco de dados
};

export async function AtualizarPost(id, novoPost) { // Função que vai utlizar os dados da página
    const db = conexao.db("Imersão-Instabytes"); 
    const colecao = db.collection("posts"); 
    const objID = ObjectId.createFromHexString(id); //Colocar o id num obj que o mongo entende

    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost}); //Inserir os dados no banco de dados
};
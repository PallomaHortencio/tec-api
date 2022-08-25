import express from "express";
import {ler} from "./src/aluno.js";

const app = express();
const porta = 3000;


/* Configurando suporte ao formato JSON */
app.use(express.json());

/* Configurando suporte a dados de inputs de formulario */
app.use(express.urlencoded({extended : true}));

/* Rotas */

/* Rota (endpoint) para a raiz da API */
app.get('/', (req, res) => {
    res.send('É um dia lindo para aprender sobre APIs');
})

/* Rota (endpoint) para exibir todos os alunos */
app.get('/alunos', (req, res) => {
   // res.send('Exibindo todos os alunos');
   ler(res);
})

/* Rota (endpoint) para exibir um unico aluno */
app.get('/alunos/:id', (req, res) => {
    res.send('Exibindo dados de UM aluno');
})

/* Post - rota para inserir alunos */
app.post('/alunos', (req,res) => {
    res.send('Inserindo alunos');
})

/* Put - atualizar TODOS os dados do aluno */
app.put('/alunos/:id', (req, res) => {
    res.send('Atualizar todos os dados de UM aluno');
})

/* Patch - atualizar alguns/todos os dados do aluno */
app.patch('/alunos/:id', (req, res) => {
    res.send('Atualizar alguns/todos os dados de um aluno');
})

/* Delete - excluir aluno */
app.delete('/alunos/:id', (req, res) => {
    res.send('Excluir aluno');
})



/* Configurando o servidor */
app.listen(porta, () => {
    console.log('Servidor express rodando');
});
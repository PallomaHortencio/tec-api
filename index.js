import express from "express";
import {ler, inserir, lerUm, atualizar, excluir} from "./src/aluno.js";

const app = express();
const porta = process.env.PORT || 3000;
/* process - a hospedagem escolhe a porta que vai usar */


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
   // res.send('Exibindo dados de UM aluno');

   const id = req.params.id;
   lerUm(id, res);
})

/* Post - rota para inserir alunos */
app.post('/alunos', (req,res) => {
   // res.send('Inserindo alunos');

   // capturando os dados a partit do corpo da requisição
   const novoAluno = req.body;

   // executando a função inserir e passando os parametros novoAluno e res
   inserir(novoAluno, res);
})

/* Put - atualizar TODOS os dados do aluno */
app.put('/alunos/:id', (req, res) => {
    res.send('Atualizar todos os dados de UM aluno');
})

/* Patch - atualizar alguns/todos os dados do aluno */
app.patch('/alunos/:id', (req, res) => {
    // res.send('Atualizar alguns/todos os dados de um aluno');

    // capturar id
    const id = parseInt(req.params.id); // parseInt é uma camada de segurança a mais para o id
    // dados aluno
    const aluno = req.body;

    atualizar(id, aluno, res); // a ordem tem que ser igual a da função
})

/* Delete - excluir aluno */
app.delete('/alunos/:id', (req, res) => {
    // res.send('Excluir aluno');

    const id = parseInt(req.params.id);
    excluir(id, res);
})



/* Configurando o servidor */
app.listen(porta, () => {
    console.log('Servidor express rodando');
});
import conexao from './Banco.js';

//Função que lê a tabela de alunos do BD (banco de dados)
function ler(res) {

// criando o CRUD
const sql = "SELECT * FROM alunos ORDER BY nome";


// conectando ao BD
conexao.query(sql, (erro, resultados) => {
    if(resultados.length === 0) {
        res.status(204).end();  // 204 = sem conteudo. O método .end() para qualquer comunicação.
        return; //die()
    }

    if(erro) {
        res.status(400).json(erro.code);   // 400 = Bad Requets - requisição inválida.
    } else {
        res.status(200).json(resultados);  // deu certo, exibir os resultados
    }
})
}


// Inserindo alunos

function inserir(aluno, res) {
    // o trecho "SET, ?" estão vindo do MySql2 e a "?" recebe os dados atribuindo na ordem. Proteção contra Injection e Tratamento de strings vindos do modulo MySql2
    // ? é um caracter coringa, pegara todos os parametros sem a necessidade de fazer o codigo igual ao php
    const sql = "INSERT INTO alunos SET ?";

    conexao.query(sql, aluno, (erro) => {
        if(erro){
            res.status(400).json(erro.code); // 400 - requisição inválida e informa o codigo de erro
        } else {
            res.status(201).json({"status": "aluno inserido"}); // 200 - criado e apresenta a mensagem aluno inserido
            // res.status(200).end();
        }
    })
}


// função que exibe UM aluno
function lerUm(id, res) {
    const sql = "SELECT * FROM alunos WHERE id = ?";

    conexao.query(sql, id, (erro, resultados) => {
        // checando se existe conteudo
        if(resultados.length === 0){
            res.status(204).end();
            return;
        }

        // if erro ou resultado
        if(erro){
             res.status(400).json(erro.code);
        } else {
            res.status(200).json(resultados[0]); // sem o [0] o codigo vem dentro da matriz, com ele manda apenas o objeto (codigo mais amigavel) 
        }
    });
}


// função atualizar
//essa função vai receber um id, os dados do aluno e res
function atualizar(id, aluno, res) {
    const sql = "UPDATE alunos SET ? WHERE id = ?";

    // a ordem do [aluno, id] importa muito, porque na const vai pegar primeiro os dados do aluno e depois seu id, precisa correponder ao sql acima
    // para passar mais de um paramentro usa-se []
    conexao.query(sql, [aluno, id], (erro, resultados) => {
        if(erro) {
            res.status(400).json(erro.code);
        } else {
          //  res.status(200).json({"status" : "Atualizado com sucesso"})

          // spread operator (operador de "espalhamento" de objeto) deixa o codigo amigavel e tudo em uma matriz so
          res.status(200).json({...aluno, id});
        }
    });
}


// função excluir
function excluir(id, res) {
    const sql = "DELETE FROM alunos WHERE id = ?";

    conexao.query(sql, id, (erro, resultados) => {
        if(erro) {
            res.status(400).json(erro.code);
        } else {
            res.status(200).json({"status" : "aluno excluido com sucesso", id});
        }
    });
}


export {ler, inserir, lerUm, atualizar, excluir};
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

export {ler};
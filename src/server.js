// Servidor
const express = require('express')
const server = express()

const { 
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
} = require('./pages')

// Configuração do Nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

server
// Requisição para recebimento do req.body
    .use(express.urlencoded({ extended: true }))
// Configurando os arquivos estáticos — CSS, Scripts e Imagens
    .use(express.static("public"))
    // Configurando as nossas páginas
    .get("/", pageLanding)
    .get("/study", pageStudy)
    .get("/give-classes", pageGiveClasses)
    .post("/save-classes", saveClasses)
    // Configurando a porta que será aberto o servidor
    .listen(5500)
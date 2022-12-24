




/*Query params => meusite.com/users?nome=Felipe&age=35
Route params => /users/2 //Buscar, Deletar ou Atualizar algo especifico

- GET  => Buscar informação no back-and

- POST => Criar informação no back-and

- PUT / PATCH => Alterar/Atualizar informação no back-and

- DELETE => Deletar informção no back-end

- Middleware => Interceptador => Tem o poder de parar ou alterar dados da requisição

*/
//bibliotecas

const express = require('express')
const uuid = require('uuid') //cria um id unico
let cors = require('cors')
//_________________________________________________________________________________________

const port = 3001
const app = express()
app.use(express.json())
app.use(cors())
const users = []



const checkUserId = (request, response, next) => { 

    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "User Not Found" })

    }

    request.userIndex = index
    request.userId = id

    next()
}


//______________________________________________________________ Buscar informação no back-and_____________________________________________________________________________

app.get('/users', (request, response) => {



    return response.json(users)

})
//_________________________________________________________________________________________________________________________________________________________________


//______________________________________________________________post criando usuários_______
app.post('/users', (request, response) => {

    const { name, age, altura } = request.body

    const user = { id: uuid.v4(), name, age, altura }

    users.push(user)

    return response.status(201).json(user)

})






//_____________________________________________________put atualizando arquivos______________________________________________________________________
app.put('/users/:id', checkUserId, (request, response) => {

   
    const { name, age, altura } = request.body
    const index = request.userIndex
    const id  = request.userId
    const updateUser = { id, name, age, altura }


    users[index] = updateUser

    return response.json(updateUser)

})



//___________________________________________________Deleta arquivo________________________________________________________________________________________
app.delete('/users/:id', checkUserId, (request, response) => {




    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()
})








app.listen(port, () => {

    console.log(`🚀 Server started on ${port}`)
})
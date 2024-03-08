const express = require("express")
const bodyParser = require("body-parser")
const {initbdd} = require("./src/bdd/sequelize")
const cors = require('cors')

const app = express()
const port = 3000

/* Les Middlewares */
app
.use(bodyParser.json())
.use(cors())


initbdd()

/* Les differents routes pour le Quiz seront ici */
require("./src/routes/quizRoutes/findAllQuiz")(app)
require("./src/routes/quizRoutes/findQuizByPk")(app)
require("./src/routes/quizRoutes/createNewQuiz")(app)
require("./src/routes/quizRoutes/updateQuiz")(app)
require("./src/routes/quizRoutes/deleteQuiz")(app)

/* Les differents routes pour l'utilisateur seront ici */
require("./src/routes/userRoutes/findAllUser")(app)
require("./src/routes/userRoutes/findUserByPk")(app)
require("./src/routes/userRoutes/createNewUser")(app)
require("./src/routes/userRoutes/updateUser")(app)
require("./src/routes/userRoutes/deleteUser")(app)
require("./src/routes/userRoutes/login")(app)

/* Ajout d'un middleware pour la gestion des erreurs 404,
il doit être exécuté après les routes pour ne pas qu'il soit appellé tout le temps*/ 
app.use(({res})=>{
    const message = "Impossible de récupérer la ressource demandée. Veuillez réessayer une autre URL"
    res.status(404).json({message})
})


app.get("/", (req,res)=>{ res.send("Hello api avec Express")})



app.listen(port, ()=>console.log(`Notre apllication est lancée sur le port: ${port}`))
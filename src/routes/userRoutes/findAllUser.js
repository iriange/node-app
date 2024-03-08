const {User} = require("../../bdd/sequelize")
const auth = require("../../auth/auth")


module.exports = (app)=>{
    app.get("/api/users",auth, (req, res)=>{
        User.findAll()
        .then(users=>{
            const message = "Toutes les utilisateurs ont bien été récupérés"
            res.json({message, data: users})
        })
        .catch(err=>{
            const message = "Impossible de récupérer la question. Veuillez réessayer dans quelque instant"
            res.status(500).json({message, data:err})
        })
    })
}
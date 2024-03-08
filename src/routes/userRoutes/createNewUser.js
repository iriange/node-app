const { ValidationError, UniqueConstraintError } = require("sequelize")
const {User} = require("../../bdd/sequelize")
const bcrypt = require("bcrypt")
const auth = require("../../auth/auth")

module.exports = (app)=>{
    app.post("/api/Newuser",auth, (req, res)=>{
        const body = req.body
        bcrypt.hash(body.password, 10)
            .then(hash=>{
                User.create({
                    pseudo:body.pseudo,
                    email:body.email,
                    password:hash
                })
                    .then(user=>{
                        const message = `L'utilisateur '${body.pseudo}' a bien été créé`
                        res.json({message, data: user})
                    })
                    .catch(e=>{
                        if (e instanceof ValidationError) {
                            return res.status(400).json({message:e.message, data:e})
                        }
                        if (e instanceof UniqueConstraintError) {
                            return res.status(400).json({message:e.message, data:e}) 
                        }
                        const message = "Impossible de récupérer l'utilisateur. Veuillez réessayer dans quelque instant"
                        res.status(500).json({message, data:e})
                    })
            })
        
    })
}
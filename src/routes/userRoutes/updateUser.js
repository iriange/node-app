const {User} = require("../../bdd/sequelize")

module.exports = (app)=>{
    app.put("/api/user/:id", (req, res)=>{
        const id = req.params.id
        const body = req.body
        User.update(body, {where: {id:id}})
            .then((_)=>{
            return User.findByPk(id)
                .then((user)=>{
                    if (user == null) {
                        const message = "Aucun utilisateur avec cet identifiant n'a été trouvé, réessayez un autre identifiant"
                        return res.status(404).json({message})
                    }
                    const message = `L'utilisateur n°${id} a bien été modifié`
                    res.json({message, data: user})
                })
            })
            .catch(err=>{
                if (err instanceof ValidationError) {
                    return res.status(400).json({message:err.message, data:err})
                }
                const message = "Impossible de récupérer l'utilisateur. Veuillez réessayer dans quelque instant"
                res.status(500).json({message, data:err})
            })
    })
}
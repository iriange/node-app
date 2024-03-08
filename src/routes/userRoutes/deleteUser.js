const {User} = require("../../bdd/sequelize")

module.exports = (app)=>{
    app.delete("/api/user/:id", (req, res)=>{
        const id = req.params.id
        User.findByPk(id)
        .then(user=>{
            if (user == null) {
                const message = "Aucune utilisateur avec cet identifiant n'a été trouvé, réessayez un autre identifiant"
                return res.status(404).json({message})
            }
            const UserDelete = user
            return User.destroy({where :{ id: id }})
                .then(_=>{
                    const message = `L'utilisateur n°${UserDelete.id} a bien été supprimé`
                    res.json({message, data: UserDelete})
                })
            
        })
        .catch(err=>{
            const message = "Impossible de récupérer la question. Veuillez réessayer dans quelque instant"
            res.status(500).json({message, data:err})
        })
    })
}
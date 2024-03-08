const { User } = require("../../bdd/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const key = require("../../auth/private_key")

module.exports = (app) => {
  app.post("/api/login", (req, res) => {
    const body = req.body;

    User.findOne({ where: { pseudo: body.pseudo } })
      .then((user) => {
        if (!user) {
          const message = "Aucun utilisateur n'a été trouvé";
          return res.status(404).json({ message });
        }
        bcrypt.compare(body.password, user.password).then((mdpValid) => {
          if (!mdpValid) {
            const message = "Le Mot de passe est incorrect";
            return res.status(401).json({ message });
          }
          const token = jwt.sign(
            {user:user.pseudo},
            key,
            {expiresIn:"24h"}
          )
          const message = "Vous avez bien été connecté";
          return res.json({ message, data: user, token });
        });
      })
      .catch((err) => {
        const message = "L'utilisateur n'a pas pu être enrégistrement, réessayez dans quelques instants";
        return res.status(500).json({ message, data: err });
      });
  });
};

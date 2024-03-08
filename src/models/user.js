module.exports = (sequelize, DataTypes)=>{
    return sequelize.define('User',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        pseudo: {
            type: DataTypes.STRING,
            allowNull:false,
            unique:{msg:"Le pseudo est déjà pris"},
            validate:{
                notNull:{msg:"Le pseudo est une propriété requise"},
            }
            
        },
        email: {
            type: DataTypes.STRING,
            allowNull:false,
            unique:{
                msg:"Le e-mail est déjà inscrit"
            },
            validate:{
                isEmail:{msg:"Il faut une e-mail valide, réessayez une autre e-mail"},
                notNull:{msg:"L'e-mail est une propriété requise"}
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull:{msg:"Le password est une propriété requise"}
            }
        }
    },
    {
        timestamps:true,
        createdAt:'created',
        updatedAt:false
    }
    )
}
module.exports = (sequelize, DataTypes)=>{
    return sequelize.define('quizapp',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        question: {
            type: DataTypes.STRING,
            allowNull:false
        },
        prop: {
            type: DataTypes.STRING,
            allowNull:false,
            get(){
                return this.getDataValue("prop").split(',')
            },
            set(prop){
                this.setDataValue("prop", prop.join())
            }
        },
        correct:{
            type: DataTypes.STRING,
            allowNull:false
        }
    },
    {
        timestamps:true,
        createdAt:'created',
        updatedAt:false
    }
    )
}
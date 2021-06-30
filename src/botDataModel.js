import { Sequelize} from 'sequelize'

class BotData extends Sequelize.Model {
    static init(sequelize) {
      return super.init(
        {
         uuid: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV1,
            primaryKey: true
          },
          pair: { type: Sequelize.DataTypes.STRING, allowNull: false},
          percentage: {type: Sequelize.DataTypes.FLOAT, allowNull: false},
          currency: {type: Sequelize.DataTypes.STRING, allowNull: false},
          basePrice: {type: Sequelize.DataTypes.FLOAT, allowNull: false},
          currentPrice: {type: Sequelize.DataTypes.FLOAT, allowNull: false},
          percentageDifference: {type: Sequelize.DataTypes.FLOAT, allowNull: false},
          isSignal: {type: Sequelize.DataTypes.BOOLEAN, allowNull: false},
        },
        { sequelize }
      );
    }
}

export default BotData
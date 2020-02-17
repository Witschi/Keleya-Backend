import * as Sequelize from 'sequelize';
import { PostAttributes, PostInstance } from 'models/Post';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';

export interface UserAttributes {
  id?: number;
  name: string;
  password: string;
  createdAt?: Date;
  posts?: PostAttributes[] | PostAttributes['id'][];
};

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
};

export const UserFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<UserInstance, UserAttributes> => {
  const attributes: SequelizeAttributes<UserAttributes> = {
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    },
	id:{
	  type: DataTypes.UUID,
	  defaultValue: DataTypes.UUIDV4,
	  allowNull: false,
      primaryKey: true
    }
  };

  const User = sequelize.define<UserInstance, UserAttributes>('User', attributes);

  User.associate = models => {
    User.hasMany(models.Post, { foreignKey: 'author_id' });
  };

  return User;
};

import * as Sequelize from 'sequelize';
import { PostAttributes, PostInstance } from 'models/Post';
import { UserAttributes, UserInstance } from 'models/User';

export interface DbInterface {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  Post: Sequelize.Model<PostInstance, PostAttributes>;
  User: Sequelize.Model<UserInstance, UserAttributes>;
}

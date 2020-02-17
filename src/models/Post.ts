import * as Sequelize from 'sequelize';
import { UserAttributes, UserInstance } from 'models/User';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';

export interface PostAttributes {
  id?: number;
  title: string;
  text: string;
  author_id?: number;
};

export interface PostInstance extends Sequelize.Instance<PostAttributes>, PostAttributes {
};

export const PostFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<PostInstance, PostAttributes> => {
  const attributes: SequelizeAttributes<PostAttributes> = {
    title: {
      type: DataTypes.STRING
    },
    text: {
      type: DataTypes.STRING(5000) // extra long length
    },
	id: {
	  type: DataTypes.UUID,
	  defaultValue: DataTypes.UUIDV4,
	  primaryKey: true}
   
  };

  const Post = sequelize.define<PostInstance, PostAttributes>('Post', attributes);

  Post.associate = models => {
    Post.belongsTo(models.User, { as: 'author', foreignKey: 'author_id' });
  };

  return Post;
};

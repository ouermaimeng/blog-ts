// tslint:disable
import * as Sequelize from "sequelize";

// table: articletagrelate
export interface articletagrelateAttribute {
  articleid?: number;
  tagid: number;
  id?: number;
}
export interface articletagrelateInstance extends Sequelize.Instance<articletagrelateAttribute>, articletagrelateAttribute {}
export interface articletagrelateModel extends Sequelize.Model<articletagrelateInstance, articletagrelateAttribute> {}

// table: articles
export interface articlesAttribute {
  id?: number;
  title: string;
  content: string;
  createTime?: Date;
  updateTime: Date;
  userid: number;
  abstract: string;
}
export interface articlesInstance extends Sequelize.Instance<articlesAttribute>, articlesAttribute {}
export interface articlesModel extends Sequelize.Model<articlesInstance, articlesAttribute> {}

// table: users
export interface usersAttribute {
  id?: number;
  username: string;
  password: string;
  canwrite: number;
}
export interface usersInstance extends Sequelize.Instance<usersAttribute>, usersAttribute {}
export interface usersModel extends Sequelize.Model<usersInstance, usersAttribute> {}

// table: tags
export interface tagsAttribute {
  id?: number;
  tag: string;
}
export interface tagsInstance extends Sequelize.Instance<tagsAttribute>, tagsAttribute {}
export interface tagsModel extends Sequelize.Model<tagsInstance, tagsAttribute> {}

// tslint:disable
import * as path from 'path';
import * as sequelize from 'sequelize';
import * as def from './db';

export interface ITables {
  articles:def.articlesModel;
  articletagrelate:def.articletagrelateModel;
  tags:def.tagsModel;
  users:def.usersModel;
}

export const getModels = function(seq:sequelize.Sequelize):ITables {
  const tables:ITables = {
    articles: seq.import(path.join(__dirname, './articles')),
    articletagrelate: seq.import(path.join(__dirname, './articletagrelate')),
    tags: seq.import(path.join(__dirname, './tags')),
    users: seq.import(path.join(__dirname, './users')),
  };
  return tables;
};

// tslint:disable
import * as path from 'path';
import * as sequelize from 'sequelize';
import * as def from './db';

export interface ITables {
  articletagrelate:def.articletagrelateModel;
  articles:def.articlesModel;
  users:def.usersModel;
  tags:def.tagsModel;
}

export const getModels = function(seq:sequelize.Sequelize):ITables {
  const tables:ITables = {
    articletagrelate: seq.import(path.join(__dirname, './articletagrelate')),
    articles: seq.import(path.join(__dirname, './articles')),
    users: seq.import(path.join(__dirname, './users')),
    tags: seq.import(path.join(__dirname, './tags')),
  };
  return tables;
};

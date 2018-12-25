/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {articletagrelateInstance, articletagrelateAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<articletagrelateInstance, articletagrelateAttribute>('articletagrelate', {
    articleid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'articles',
        key: 'id'
      }
    },
    tagid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'tags',
        key: 'id'
      }
    },
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'articletagrelate'
  });
};

import * as knex from 'knex';
import * as bookshelf from 'bookshelf';
import * as knexConfig from '../knexfile.js'

export default bookshelf(knex(knexConfig.development));
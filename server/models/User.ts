import bookshelf from '../bookshelf';

export const User: any = bookshelf.Model.extend({
    tableName: 'users',
});
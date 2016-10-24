if (process.env.NODE_ENV === 'development') {
  import {
    Authors as AuthorsModel,
    Books as BooksModel,
  } from 'meteor/lnmunhoz:models';

  Books = BooksModel;
  Authors = AuthorsModel;
}

import './methods';

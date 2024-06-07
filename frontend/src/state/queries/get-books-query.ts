import { gql } from '@apollo/client';

// The query to get all books
export const GET_BOOKS = gql`
  query Books {
    books {
      author
      coverPhotoURL
      readingLevel
      title
    }
  }
`;
import gql from 'graphql-tag'

export const allArticles = gql`
  {
    allArticles {
      id
      title
      content
      image {
        alt
        url
      }
      source {
        name
        picture {
          alt
          url
        }
      }
      dateTime
      readingTime
    }
  }
`

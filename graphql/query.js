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

export const articleById = gql`
 query ($id: ItemId) {
  article(filter: { id: { eq: $id } }) {
    id
    title
    content
    dateTime
    readingTime
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
  }
 }
`

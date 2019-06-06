import gql from 'graphql-tag'

export const allArticles = gql`
  {
    allArticles(filter: { shown: {eq: true } }) {
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

export const allDelegates = gql`
  {
    allDelegates {
      id
      name
      firstname
      age
      since
      avatar {
        alt
        url
      }
      description
      job
      totalvote
      weathervotes {
        weather {
          title
          description
          image {
            alt
            url
          }
        }
      }
    }
  }
`

export const delegateById = gql`
  query ($id: ItemId) {
    delegate(filter: { id: { eq: $id } }) {
      id
      name
      firstname
      age
      since
      avatar {
        alt
        url
      }
      description
      job
      totalvote
      weathervotes {
        weather {
          title
          description
          image {
            alt
            url
          }
        }
      }
    }
  }
`

export const weathers = gql`
  {
    allWeathers {
      id
      title
      description
      vote
      image {
        alt
        url
      }
    }
  }
`

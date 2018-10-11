import gql from 'graphql-tag'

/**
 * Query used for requesting skills from api.
 */
export const GET_SKILLS = gql`
  query {
    allSkills {
      edges {
        node {
          id
          skill
        }
      }
    }
  }
`

export const GET_EMPLOYER = gql`
  query employer($id: ID!) {
    employer(id: $id) {
      id
      companyName
      employeesNumber
      phoneNumber
      description
      address
      postcode
      website
      logo
      fullName
      jobofferSet {
        edges {
          node {
            id
            role {
              id
              name
            }
            skill {
              edges {
                node {
                  id
                  skill
                }
              }
            }
            # educationLevel
            # permanent
            # experience
            # postcode
            # startIn
            # interviewStages
            # remuneration
            spec
            # contractLength
            # offersSponsorship
          }
        }
      }
      user {    
        id
        username
        email
        isActive
      }
    }
  }
`

export const ALL_ROLES = gql`
  query {
    allRoles {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`

export const ALL_EDUCATION_LEVELS = gql`
  query {
    allEducationLevels {
      edges {
        node {
          id
          name
          level
        }
      }
    }
  }
`

export const ALL_QUESTIONS = gql`
  query {
    allStandardQuestions {
      edges {
        node {
          id
          question {
            id
            standardquestion {
              id
              question {
                id
                question
              }
            }
            answer {
              edges {
                node {
                  id
                  answer
                }
              }
            }
          }
        }
      }
    }
    allEducationLevels {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`
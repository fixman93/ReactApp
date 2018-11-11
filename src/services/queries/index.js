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
             educationLevel {
               name
             }
             permanent
             experience
             postcode
             startIn
             interviewStages {
               stages 
             }
             remuneration
            spec
             contractLength
             offersSponsorship
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

export const ALL_ROLES_AND_INTERVIEW_STAGES = gql`
query {
  allRoles {
    edges {
      node {
        id
        name
      }
    }
    }
  allInterviewStages {
        edges {
          node {
            id
            stages 
          }
        }
      }
  }
`

export const ALL_COMPANIES = gql`
  query {
    allCompanies {
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
          question {
            standardquestion {
              id,
              answers,
              question {
                id,
                question
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
          level
        }
      }
    }
  }
`


export const GET_CANDIDATE = gql`
  query candidate($id: ID!) {
    candidate(id: $id) {
      fullName,
      id,
      user {
        username
      },
      educationLevel {
        name,
        id
      },
      skill {
        edges {
          node {
            skill,
            id
          }
        }
      },
      fullName,
      permanent,
      contract,
      needsSponsorship,
      phoneNumber,
      postcode,
      maxCommute,
      currentSalary,
      desiredSalary,
      portfolioSet {
        edges {
          node {
            link
          }
        }
      },
      jobSet {
        edges {
          node {
            role {
              name,id
            },
            company {
              name
            }
          }
        }
      },
      rolesoughtSet {
        edges {
          node {
            role {
              name, id
            }, 
            experience
          }
        }
      }
    }
  }
`
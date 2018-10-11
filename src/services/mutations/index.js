import gql from "graphql-tag";

/**
 * Mutation for updating company details.
 *
 * Used in second step of registration.
 *
 * Component: RegisterFormSecondStep
 */
export const UPDATE_COMPANY = gql`
  mutation employerDetails($input: EmployerDetailsMutationInput!) {
    employerDetails(input: $input) {
      ok
      employer {
        id
      }
    }
  }
`;

/**
 * Mutation for registering new company profile.
 *
 * Used in first step of registration.
 *
 * Component: RegisterFormFirstStep
 */
export const ADD_COMPANY = gql`
  mutation employerJoin($input: EmployerJoinMutationInput!) {
    employerJoin(input: $input) {
      ok
      # employer {
      #   id
      #   jobofferSet {
      #     node {
      #       id
      #       companyName
      #     }
      #   }
      # }
    }
  }
`;

export const ADD_TALENT = gql`
  mutation candidateJoin($input: CandidateJoinMutationInput!) {
    candidateJoin(input: $input) {
      ok
    }
  }
`;

// export const ADD_TALENT = gql`
//   mutation candidateJoin(
//     $fullName: String!,
//     $email: String!,
//     $password: String!,
//     $permanent: Boolean!,
//     $contract: Boolean!,
//   ) {
//     candidateJoin(
//       input: {
//         fullName: $fullName,
//         email: $email,
//         password: $password,
//         permanent: $permanent,
//         contract: $contract
//       }
//     ) {
//       ok
//     }
//   }
// `;

/**
 * Mutation used for login.
 *
 * Used in login form.
 *
 * Component: LoginForm
 */
export const LOGIN_USER = gql`
  mutation tokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      id
      token
    }
  }
`

/**
 * Mutation used for activating user redirected by email.
 *
 * Used in page for mail redirection.
 *
 * Component: RegisterFormEmail
 */

export const ACTIVATE_USER = gql`
  mutation activate($input: AccountActivateMutationInput!) {
    activate(input: $input) {
      ok
    }
  }
`;

/**
 * Collection of job objects for user/employer.
 *
 * Mutation used to save a new job. While saving the new job, all
 * previous jobs need to be retrieved and concatenated together,
 * otherwise they will get deleted.
 *
 * Used in page for creating post.
 *
 * Component: PostFormPage
 */
export const ADD_JOB = gql`
  mutation employerDetails(
    # $input: EmployerDetailsMutationInput!,
    $userId: ID!
    # $postId: ID!,
    $employerId: ID
    $roleId: ID
    $skill: [SkillInput!]
    $educationLevelId: ID
    $permanent: Boolean
    $experience: Int
    $startIn: Int
    $postcode: String
    $interviewStages: Int
    $remuneration: Int
    $spec: String
    $contractLength: Int
    $offersSponsorship: Boolean
    $jobofferresponseSet: [JobOfferResponseInput!]
  ) {
    employerDetails(
      input: {
        id: $userId
        jobofferSet: {
          # id: $postId,
          jobofferresponseSet: $jobofferresponseSet
          employerId: $employerId
          roleId: $roleId
          skill: $skill
          educationLevelId: $educationLevelId
          permanent: $permanent
          experience: $experience
          postcode: $postcode
          startIn: $startIn
          interviewStages: $interviewStages
          remuneration: $remuneration
          spec: $spec
          contractLength: $contractLength
          offersSponsorship: $offersSponsorship
        }
      }
    ) {
      ok
      employer {
        id
        jobofferSet {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }
`

// export const UPDATE_JOB = gql`
//   mutation updateJob(
//     input: {
//       $id: ID,
//       $employerId: ID,
//       $roleId: ID,
//       $skillId: ID,
//       $educationLevelId: ID,
//       $permanent: Boolean,
//       $experience: Int,
//       $postcode: String,
//       $startIn: Int,
//       $interviewStages: Int,
//       $remuneration: Int,
//       $spec: String,
//       $contractLength: Int,
//       $offersSponsorship: Boolean
//     }
//   ) {
//     employerDetails(input: {
//       jobofferSet: {
//         id: $id,
//         employerId: $employerId,
//         roleId: $roleId,
//         skill: {
//           id: $skillId
//         },
//         educationLevelId: $educationLevelId,
//         permanent: $permanent,
//         experience: $experience,
//         postcode: $postcode,
//         startIn: $startIn,
//         interviewStages: $interviewStages,
//         remuneration: $remuneration,
//         spec: $spec,
//         contractLength: $contractLength,
//         offersSponsorship: $offersSponsorship
//       }
//     })
//   }
// `

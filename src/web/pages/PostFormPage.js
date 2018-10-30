import React, { Component } from 'react'
import PostPage from 'web/pages/PostPage'
import { Mutation, Query } from 'react-apollo'
import PostHeader from 'common/PostHeader'
import PostForm from '../components/PostForm'
import PostFormTwo from '../components/PostFormTwo'
import PostFormPreview from '../components/PostForm/PostFormPreview'
import PostFormSkills from '../components/PostForm/PostFormSkills'
import { ADD_JOB } from 'services/mutations'
import { GET_EMPLOYER } from '../../services/queries';

class PostFormPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: {},
      page: 1,
      userId: null,
      questions: {},
      educations: {}
    }
  }

  componentDidMount = () => {
    this.setState({
      userId: localStorage.getItem('userId')
    })
  }

  prevPage = () => {
    if (this.state.page > 1) {
      this.setState(prevState => ({
        page: prevState.page - 1
      }))
    }
  }

  nextPage = () => {
    if (this.state.page < 4) {
      this.setState(prevState => ({
        page: prevState.page + 1
      }))
    }
  }



  handleStep = (data) => {
    const { userId } = this.state;
    this.setState(prevState => ({
      input: {
        ...prevState.input,
        id: userId,
        jobofferSet: {
          ...prevState.input.jobofferSet,
          ...data,


        }
      },
      // educations to be able to display education names in PostPreviewPage
      educations: { ...data.educations }
    }))
    this.nextPage()
  }

  render() {
    const { input, page } = this.state
    return (
      <Query
        query={GET_EMPLOYER}
        variables={{ id: localStorage.getItem('userId') }}
      >
        {data => {
          const employerId = data && data.data &&
            data.data.employer && data.data.employer.id
          const postcode = data && data.data &&
            data.data.employer && data.data.employer.postcode
          return (
            <Mutation
              mutation={ADD_JOB}

              onCompleted={data => {
                this.props.history.push('/company/jobs/active')
              }
              }
            >
              {addJobMutation => (
                <PostPage>
                  <PostHeader
                    activeId={page}
                  />
                  {page === 1 && (
                    <PostForm
                      heading={{
                        title: 'What are you looking for?',
                        desc: 'Please fill out the information below so we can help with your search',
                        color: 'white'
                      }}
                      propsData={this.state.input}
                      onBack={this.prevPage}
                      onSubmit={this.handleStep}
                    />
                  )}
                  {page === 2 && (
                    <PostFormSkills
                      heading={{
                        title: 'What skills are required?',
                        desc: 'Tag a maximum of 15, include technical, soft & management skills',
                        color: 'white'
                      }}
                      onBack={this.prevPage}
                      onSubmit={this.handleStep}
                      propsData={input}
                    />
                  )}
                  {page === 3 && (
                    <PostFormTwo
                      heading={{
                        title: 'What are you looking for?',
                        desc: 'Please fill out the information below so we can help with your search',
                        color: 'white'
                      }}
                      propsData={this.state.input}
                      onBack={this.prevPage}
                      onSubmit={this.handleStep}
                    />
                  )}
                  {page === 4 && (
                    <PostFormPreview
                      propsData={input}
                      queryData={data}
                      onBack={this.prevPage}
                      onSubmit={() => {
                        addJobMutation({
                          variables: {
                            employerId,
                            roleId: input.jobofferSet.roleId,
                            educationLevelId: input.jobofferSet.educationLevelId,
                            permanent: input.jobofferSet.contractLength === 1 ? true : false,
                            userId: this.state.userId,
                            postcode,
                            experience: input.jobofferSet.experience,
                            skills: [...input.jobofferSet.skillsIds],
                            contractLength: input.jobofferSet.contractLength,
                            offerSponsorship: input.jobofferSet.offer,
                            spec: input.jobofferSet.spec,
                            remuneration: input.jobofferSet.remuneration,
                            interviewStages: input.jobofferSet.interviewStages,
                            startIn: input.jobofferSet.startIn
                          }
                        })
                      }}
                    />
                  )}
                </PostPage>
              )}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}

export default PostFormPage
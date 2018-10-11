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
      userId: null
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

  additionalData = data => {
    console.log('ADDITIONAL DATA', data)
    this.setState(prevState => ({
      input: {
        ...prevState.input,
        jobofferSet: {
          ...data,
        }
      }
    }))
  }

  handleStep = (formRef, optionalData) => {
    const { userId } = this.state
    let data = {}
    const elements = formRef.current.elements
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].value !== '') {
        data[elements[i].name] = elements[i].value
      }
    }
    this.setState(prevState => ({
      input: {
        ...prevState.input,
        id: userId,
        // jobofferSet: {
        ...prevState.input.jobofferSet,
        ...data,
        ...optionalData,
        // postcode: "novi sad"
        // }
      }
    }))
    this.nextPage()
  }

  // @TODO: figure out if each step should save the data to the server
  render() {
    const { input, page } = this.state
    return (
      <Query
        query={GET_EMPLOYER}
        variables={{ id: localStorage.getItem('userId') }}
      >
        {data => {
          const postcode = data && data.data &&
            data.data.employer && data.data.employer.postcode
          console.log(data)
          return (
            <Mutation
              mutation={ADD_JOB}
              variables={{
                userId: input.id,
                roleId: input.roleId,
                employerId: input.id,
                educationLevelId: input.educationLevelId,
                contractLength: input.contractLength,
                experience: input.experience,
                remuneration: input.remuneration,
                postcode: postcode,
                spec: input.spec,
                interviewStages: input.interviewStages,
                startIn: input.startIn,
                jobofferresponseSet: input.jobofferresponseSet,
                permanent: false,
              }}
              onCompleted={data => this.props.history.push('/company/jobs/active')}
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
                      input={this.state.input}
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
                      onBack={this.prevPage}
                      onSubmit={this.handleStep}
                    />
                  )}
                  {page === 4 && (
                    <PostFormPreview
                      data={input}
                      queryData={data}
                      onBack={this.prevPage}
                      handleAddData={this.additionalData}
                      onSubmit={() => {
                        console.log(this.state)
                        addJobMutation(
                          // input.educationLevelId,
                          // input.permanent,
                          // "novi sad"
                          // input.postcode,
                          // input.
                        )
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
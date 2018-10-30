

export const setInput = (component, name, value) => {
    component.setState(prevState => ({
        input: Object.assign({}, prevState.input, { [name]: value })
    }))
}

export const setError = (component, name, value) => {
    component.setState(prevState => ({
        errors: Object.assign({}, prevState.errors, { [name]: value })
    }))
}
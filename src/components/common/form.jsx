import React, { Component } from 'react';
import Input from './input'
import Joi from 'joi-browser';
import Select from './select';

class Form extends Component {
  state = {
    data: {},
    errors: {}
  }

  validate = () => {
    const options = { abortEarly: false }
    const result = Joi.validate(this.state.data, this.schema, options)
    // console.log('result:', result);

    if (!result.error) return null;
    const errors = {}

    for (let item of result.error.details)
      errors[item.path[0]] = item.message
    return errors

    // const errors = {}
    // const { data } = this.state
    // if (data.username.trim() === '') {
    //   errors.username = 'Username is required.'
    // }

    // if (data.password.trim() === '') {
    //   errors.password = 'Password is required.'
    // }

    // return Object.keys(errors).length === 0 ? null : errors
  }

  validateProperty = ({ name, value }) => {
    // if (name === 'username') {
    //   if (value.trim() === '') return "Username is required."
    // }
    // if (name === 'password') {
    //   if (value.trim() === '') return "Password is required."
    // }

    // [name] will take name as a key, es6 syntax
    const obj = { [name]: value }
    const schema = { [name]: this.schema[name] }
    const { error } = Joi.validate(obj, schema) // abortEarly by default
    return error ? error.details[0].message : null
  }

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors }
    const errorMsg = this.validateProperty(input)

    if (errorMsg) errors[input.name] = errorMsg
    else delete errors[input.name]

    const data = { ...this.state.data }
    data[input.name] = input.value
    this.setState({ data, errors })
  }

  handleSubmit = e => {
    // or it will full reload the page
    e.preventDefault()
    const errors = this.validate()
    this.setState({ errors: errors || {} })
    if (errors) {
      console.log('errors:', errors);
      return
    }

    // const username = document.getElementById('username').value
    // const password = document.getElementById('password').value
    // const username = this.username.current.value;
    this.doSubmit()
  }

  renderButton(label) {
    return (
      <button
        disabled={this.validate()}
        className="btn btn-primary">{label}</button>
    )
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state

    return (
      <Input
        name={name}
        value={data[name]}
        label={label}
        type={type}
        error={errors[name]}
        onChange={this.handleChange}
      />
    )
  }

  renderSelect(name, label, optioins) {
    const { data, errors } = this.state

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={optioins}
        error={errors[name]}
        onChange={this.handleChange}
      />
    )
  }
}

export default Form;
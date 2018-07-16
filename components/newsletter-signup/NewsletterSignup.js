import React, { Component } from 'react'
import toQueryString from 'to-querystring'
import jsonp from 'jsonp'

import Input from '@components/input'
import Button from '@components/button'

import Arrow from '@components/outline-arrow'

import './NewsletterSignup.scss'

const subscribeURL =
  'https://blockstack.us14.list-manage.com/subscribe/post?u=394a2b5cfee9c4b0f7525b009&amp;id=0e5478ae86'

class NewsletterSignup extends Component {
  state = {
    email: '',
    validEmail: true,
    success: false,
    error: null
  }

  updateEmailAddress = (event) => {
    const email = event.target.value
    this.setState({ email })

    const regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (email.length > 4) {
      this.setState({ validEmail: regEx.test(this.state.email) })
    }
  }

  signup = (event) => {
    console.log('sign me up please')

    const data = { EMAIL: this.state.email }
    const url = subscribeURL.replace('/post?', '/post-json?')

    const params = toQueryString(data)

    jsonp(url + '&' + params, { param: 'c' }, (err, res) => {
      if (err || res.result !== 'success') {
        console.log(err)
        this.setState({ error: err })
      } else {
        console.log(res)
        this.setState({ success: true })
      }
    })
  }

  render() {
    return (
      <div
        className={
          !this.state.validEmail && this.state.email != ''
            ? 'newsletter-form invalid'
            : 'newsletter-form'
        }
      >
        <Input
          id={this.props.id}
          placeholder="Get email updates"
          className={this.props.inputClass}
          value={this.state.email}
          onChange={this.updateEmailAddress}
        />
        <Button
          onClick={this.signup}
          icon={() => <Arrow />}
          className={'transparent circle ' + this.props.inputClass}
          htmlFor={this.props.id}
          disabled={
            this.state.email.length < 4 ||
            !this.state.validEmail ||
            this.state.success
              ? true
              : false
          }
        />
      </div>
    )
  }
}

export default NewsletterSignup

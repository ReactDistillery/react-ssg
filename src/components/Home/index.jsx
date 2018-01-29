import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withDone } from 'react-router-server';

@withDone
class component extends Component {
  constructor() {
    super();
    this.state = { asynchronousText: null };
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState(() => ({
        asynchronousText: 'This text should be visible on your static HTML page.',
      }));
      requestAnimationFrame(() => {
        done();
      });
    }, 1000);
  }

  render() {
    return (
      <div>
        {this.state.asynchronousText}
      </div>
    );
  }
}

export default component;

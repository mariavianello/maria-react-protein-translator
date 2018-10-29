import ButtonMatrix from './ButtonMatrix';
import React, { Component } from 'react';
import SequenceTranslator from './sequenceTranslator';

export default class App extends Component {
  render() {
    return (
      <div>
        <SequenceTranslator />
        <ButtonMatrix />
      </div>
    );
  }
}

import React, { Component } from 'react';

const DEFAULT_STATE = {
  codonArray: [],
  OutputPolypeptide: [],
};

export default class ButtonMatrix extends Component {
  constructor(props) {
    super(props);

    this.state = DEFAULT_STATE;
  }

  _reset = () => {
    this.setState(DEFAULT_STATE);
  }

  _handleChange = (codon) => {
    return (event) => {
      event.preventDefault();
      this.setState({
        codonArray: this.state.codonArray.concat([codon]),
      });
    };
  }

  _handleSubmit = async (event) => {
    // alert(' A codon was submitted: ' + this.state.codon);
    event.preventDefault();

    const response = await fetch('http://127.0.01:9292/translation?sequence=' + this.state.codonArray.join(''), {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });

    const json = await response.json();
    this.setState({
      OutputPolypeptide: json.result,
    });
  }

  render() {
    return (
      <div className="purple">
        <h2>Translate using Codon Buttons</h2>
        <p><span className="bold"> Directions: </span> Use the buttons to create a sequence of Codons then click the translate button.</p>
        <div className="center">
          <button onClick={this._handleChange('AUG')}>AUG</button>
          <button onClick={this._handleChange('UAA')}>UAA</button>
          <button onClick={this._handleChange('UAC')}>UAC</button>
          <button onClick={this._handleChange('UAG')}>UAG</button>
          <button onClick={this._handleChange('UAU')}>UAU</button>
          <button onClick={this._handleChange('UCA')}>UCA</button>
          <button onClick={this._handleChange('UCC')}>UCC</button>
          <button onClick={this._handleChange('UCG')}>UCG</button>
          <button onClick={this._handleChange('UCU')}>UCU</button>
          <button onClick={this._handleChange('UGA')}>UGA</button>
          <button onClick={this._handleChange('UGC')}>UGC</button>
          <button onClick={this._handleChange('UGG')}>UGG</button>
          <button onClick={this._handleChange('UGU')}>UGU</button>
          <button onClick={this._handleChange('UUA')}>UUA</button>
          <button onClick={this._handleChange('UUC')}>UUC</button>
          <button onClick={this._handleChange('UUG')}>UUG</button>
          <button onClick={this._handleChange('UUU')}>UUU</button>
          <button
            className="mainButton"
            onClick={this._handleSubmit}
          >TRANSLATE
          </button>
        </div>
        <h3>RNA Sequence:</h3>
        <div>
          <p className="buttonInput">{this.state.codonArray}</p>
        </div>
        <h3>Resulting Polypeptide:</h3>
        <div className="output">
          <p className="OutputPolypeptide"> {this.state.OutputPolypeptide.join(' ')} </p>
        </div>
        <button
          onClick={this._reset}
          className="center"
        >Reset
        </button>
      </div>
    );
  }
}

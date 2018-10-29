import React, { Component } from 'react';

export default class SequenceTranslator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      codon: '',
      OutputPolypeptide: [],
    };
  }

  _handleChange = (event) => {
    this.setState({
      codon: event.target.value,
    });
  }

  _handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://127.0.01:9292/translation?sequence=' + this.state.codon, {
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

  _parseOutput = () => {
    if (Array.isArray(this.state.OutputPolypeptide)) {
      return this.state.OutputPolypeptide.join(' ');
    } else {
      return this.state.OutputPolypeptide;
    }
  }

  render() {
    return (
      <div>
        <h2>Try it for Yourself</h2>
        <p><span className="bold"> Directions: </span> Enter a sequence of Codons from the table above and click the translate button.</p>
        <h3>RNA Sequence:</h3>
        <div className="center">
          <input
            name="codon sequence"
            type="text"
            placeholder="enter RNA Sequence"
            value={this.state.codon}
            onChange={this._handleChange}
          />
          <button
            className="mainButton"
            onClick={this._handleSubmit}
          >TRANSLATE
          </button>
        </div>
        <h3>Resulting Polypeptide:</h3>
        <div className="output">
          <p className="OutputPolypeptide"> {this._parseOutput()} </p>
        </div>
      </div>
    );
  }
}

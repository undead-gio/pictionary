import React from 'react';

class SnackWord extends React.Component {

  render() {

    return (
      <div>
        <h2>{this.props.word}</h2>
      </div>
    );
  }
}


export default SnackWord;
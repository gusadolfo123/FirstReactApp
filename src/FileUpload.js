import React, {Component} from 'react';

export class FileUpload extends Component {
  constructor() {
    super();
    this.state = {
      uploadValue: 0,
    };
  }

  render() {
    return (
      <div>
        <progress value={this.state.uploadValue} max="100">
          {this.state.uploadValue} %
        </progress>
        <br />
        <input type="file" onChange={this.props.onUpload} />
      </div>
    );
  }
}

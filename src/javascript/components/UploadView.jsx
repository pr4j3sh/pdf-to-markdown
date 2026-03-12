import React from "react";

import Dropzone from "react-dropzone";
import FaCloudUpload from "react-icons/lib/fa/cloud-upload";

export default class UploadView extends React.Component {
  static propTypes = {
    uploadPdfFunction: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      uploadPdfFunction: props.uploadPdfFunction,
    };
  }

  onDrop(files) {
    if (files.length > 1) {
      alert(`Maximum one file allowed to upload, but not ${files.length}!`);
      return;
    }
    const reader = new FileReader();
    const uploadFunction = this.state.uploadPdfFunction;
    reader.onload = (evt) => {
      const fileBuffer = evt.target.result;
      uploadFunction(new Uint8Array(fileBuffer));
    };
    reader.readAsArrayBuffer(files[0]);
  }

  render() {
    return (
      <Dropzone
        onDrop={this.onDrop.bind(this)}
        multiple={false}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 5,
          textAlign: "center",
        }}
      >
        <div className="container">
          <h2>Upload PDF file</h2>
        </div>
        <h1>
          <FaCloudUpload width={100} height={100} />
        </h1>
        <br />
      </Dropzone>
    );
  }
}

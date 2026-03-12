import React from "react";

import Grid from "react-bootstrap/lib/Grid";

import TopBar from "./TopBar.jsx";
import FooterBar from "./FooterBar.jsx";
import { View } from "../models/AppState.jsx";
import UploadView from "./UploadView.jsx";
import LoadingView from "./LoadingView.jsx";
import ResultView from "./ResultView.jsx";
import DebugView from "./DebugView.jsx";

export default class App extends React.Component {
  static propTypes = {
    appState: React.PropTypes.object.isRequired,
  };

  render() {
    // console.debug(this.props.appState);
    const appState = this.props.appState;

    var mainView;
    switch (this.props.appState.mainView) {
      case View.UPLOAD:
        mainView = <UploadView uploadPdfFunction={appState.storeFileBuffer} />;
        break;
      case View.LOADING:
        mainView = (
          <LoadingView
            fileBuffer={appState.fileBuffer}
            storePdfPagesFunction={appState.storePdfPages}
          />
        );
        break;
      case View.RESULT:
        mainView = (
          <ResultView
            pages={appState.pages}
            transformations={appState.transformations}
          />
        );
        break;
      case View.DEBUG:
        mainView = (
          <DebugView
            pages={appState.pages}
            transformations={appState.transformations}
          />
        );
        break;
      default:
        throw `View ${this.props.appState.mainView} not supported!`;
    }

    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Grid
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <div style={{ padding: "2rem 0", height: "100%", width: "100%" }}>
            {mainView}
          </div>
        </Grid>
      </div>
    );
  }
}

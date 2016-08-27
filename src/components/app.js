import React from "react";
import { connect } from "react-redux";
import {
  populateMetadataStore,
  populateTreeStore,
  populateSequencesStore,
  populateFrequenciesStore
} from "../actions";
import ChooseVirus from "./controls/choose-virus";

import Radium from "radium";
import _ from "lodash";
// import {Link} from "react-router";
// import Awesome from "react-fontawesome";
import Flex from "./framework/flex";
import Header from "./framework/header";
import Controls from "./controls/controls";
import Tree from "./tree/tree";
import Footer from "./framework/footer";
import shouldFetchDataset from "../util/shouldFetchDataset";

// const returnStateNeeded = (fullStateTree) => {
//   return {
//     metadata: fullStateTree.metadata,
//     tree: fullStateTree.tree,
//     sequences: fullStateTree.sequences,
//     frequencies: fullStateTree.frequencies
//   };
// };

@connect()
@Radium
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false
      // sidebarDocked: true,
    };
  }
  static propTypes = {
    /* react */
    dispatch: React.PropTypes.func,
    params: React.PropTypes.object,
    /* component api */
    error: React.PropTypes.object,
    loading: React.PropTypes.bool,
    user: React.PropTypes.object,
    routes: React.PropTypes.array,
    // foo: React.PropTypes.string
  }
  static defaultProps = {
    // foo: "bar"

  }
  componentDidMount() {
    this.maybeFetchDataset()
  }
  componentDidUpdate() {
    this.maybeFetchDataset()
  }
  maybeFetchDataset() {
    const query = this.props.location.query;
    console.log(shouldFetchDataset(query))
    if (shouldFetchDataset(query)) {
      this.props.dispatch(populateMetadataStore(query));
      this.props.dispatch(populateTreeStore(query));
      this.props.dispatch(populateSequencesStore(query));
      this.props.dispatch(populateFrequenciesStore(query));
    }
  }
  drawTreeIfData() {
    const p = this.props;
    let markup;

    // if (
    //   p.metadata.metadata &&
    //   p.tree.tree
    //   // p.sequences.sequences &&
    //   // p.frequencies.frequencies
    // ) {
    //   markup = (<Tree/>);
    // }

    return markup;
  }
  render() {
    console.log('app', this.props)
    return (
      <div style={{
          margin: "0px 20px"
        }}>
        <Header/>
        <ChooseVirus {...this.props.location}/>
        <Flex
          style={{
            width: "100%"
          }}
          wrap="wrap"
          alignItems="flex-start"
          justifyContent="space-between">
          <Controls/>
          {this.drawTreeIfData()}
        </Flex>
        <Footer/>
      </div>
    );
  }
}

export default App;

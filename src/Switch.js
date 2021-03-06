import React, { Component } from 'react-native';
import DefaultRenderer from './DefaultRenderer';
import Actions from './Actions';

export default class extends Component {
  constructor(props) {
    super(props);
    this.updateState = this.updateState.bind(this);
    this.state = {};
  }

  componentDidMount() {
    this.updateState(this.props);
  }

  componentWillReceiveProps(props) {
    this.updateState(props);
  }

  updateState(props) {
    const navState = props.navigationState;

    const selector = props.selector;
    if (!selector) console.error('Selector should be defined.');

    const selectedKey = selector(props);
    if (!selectedKey) console.error('Selector should return key.');

    const selected = navState.children.filter(el => el.sceneKey === selectedKey);
    if (!selected) console.error(`A scene for key “${selectedKey}” does not exist.`);

    const navigationState = selected[0];
    if (!navigationState) console.error(`Cannot find a scene with key “${selectedKey}”`);

    if (navigationState.key !== navState.children[navState.index].key) {
      Actions[selectedKey]();
    }

    this.setState({ navigationState });
  }

  render() {
    if (this.state.navigationState) {
      return <DefaultRenderer navigationState={this.state.navigationState} />;
    }

    return null;
  }
}

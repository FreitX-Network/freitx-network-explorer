// @flow

import Component from 'inferno-component';
import document from 'global/document';
import window from 'global/window';

export class OnexExplorerTitle extends Component {
  props: {
    status: string,
  };

  constructor(props: any) {
    super(props);
    this.state = {
      fetchLive: 0,
    };
  }

  componentWillUnmount() {
    window.clearInterval(this.state.fetchLive);
  }

  componentDidMount() {
    const fetchLive = window.setInterval(() => this.flash(), 500);
    this.setState({fetchLive});
  }

  flash() {
    const tag = document.getElementsByClassName('live-tag-icon')[0];
    tag.style.visibility = tag.style.visibility === 'hidden' ? 'visible' : 'hidden';
  }

  render() {
    return (
      <div className='column container main-title-wrap'>
        <h1 className='title main-title'>Explorer</h1>
        <span className='live-tag'>
          <i className='fas fa-square-full live-tag-icon'/>
          <span className='live-tag-text'>{this.props.status}</span>
        </span>
      </div>
    );
  }
}

import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);

    console.log('hak hak ',this.props)
  }

  render() {
    const { title, description } = this.props.stream;

    console.log('hak hak ',this.props)

    if (!this.props.stream) {
      return <div> Loading .. </div>    
    }

    return (
      <div>
        <h1>{title}</h1>
        <h1>{description}</h1>
      </div>
    );
  }

}

const mapStateToProps = ( state, ownProps ) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow);
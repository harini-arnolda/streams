import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  

  componentDidMount() {
    console.log("inside ", this.props);

    window.gapi.load('client:auth2', () => {
      window.gapi.auth2.init({
        clientId: '500899028401-7dlh1v2nfvgkfrigk87f4fqjepnrn98c.apps.googleusercontent.com',
        scpoe: 'email'
      }).then(() => {
        this.onAuthChange(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(window.gapi.auth2.getAuthInstance().currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  }

  onSignInClick = () => {
    window.gapi.auth2.getAuthInstance().signIn();
  };

  onSignOutClick = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  renderAuthButton() {
    console.log('isSignedIn ', this.props.isSignedIn)
    if(this.props.isSignedIn === null) {
      return null;
    } else if(this.props.isSignedIn) {
      return (<button onClick={this.onSignOutClick} className="ui red google button">
        <i className="google icon" />
        Sign Out
      </button>);
    } else {
      return (<button onClick={this.onSignInClick} className="ui red google button">
        <i className="google icon" />
        Sign In with Google
      </button>);
    }
  }


  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
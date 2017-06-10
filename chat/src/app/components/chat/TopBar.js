import React from "react";
import {connect} from "react-redux";

class TopBar extends React.Component {

    constructor(props) {
        super(props);
    }

    logout() {
        alert("logout");
    }

    render() {
        return (
            <div id="settings">
                <p> { this.props.username } </p>
                <button onSubmit={this.logout} value="Logout"/>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    username: state.user.name
});

export default connect(mapStateToProps, null)(TopBar);

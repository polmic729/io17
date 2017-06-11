import React from "react";
import {connect} from "react-redux";

class Groups extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div id="chatGroups">
                <div className="entityContainer">
                    <h3>grupowe</h3>
                    <div>test_online1</div>
                    <div>test_online2</div>
                    <div>test_offline1</div>
                    <div>test_offline2</div>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    username: state.user.name
});

export default connect(mapStateToProps, null)(Groups);

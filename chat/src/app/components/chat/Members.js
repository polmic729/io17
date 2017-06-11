/**
 * Created by mizworski on 6/11/17.
 */
import React from "react";
import {connect} from "react-redux";

class Members extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        return (
            <div id="chatMembers">
                <div className="entityContainer">
                    <h3>dostępni</h3>
                    <div>test_online1</div>
                    <div>test_online2</div>
                    <h3>niedostępni</h3>
                    <div>test_offline1</div>
                    <div>test_offline2</div>
                    <div>test_offline1</div>
                    <div>test_offline2</div>
                    <div>test_offline1</div>
                    <div>test_offline2</div>
                    <div>test_offline1</div>
                    <div>test_offline2</div>
                    <div>test_offline1</div>
                    <div>test_offline2</div>
                    <div>test_offline1</div>
                    <div>test_offline2</div>
                    <div>test_offline1</div>
                    <div>test_offline2</div>
                    <div>test_offline1</div>
                    <div>test_offline2</div>
                    <div>test_offline1</div>
                    <div>test_offline2</div>
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

export default connect(mapStateToProps, null)(Members);

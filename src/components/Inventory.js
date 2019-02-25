import React from 'react';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import firebase from 'firebase';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component {
    state = {
        uid: null,
        owner: null
    };

    // Mine doesn't work, says 'user' is not defined 
    // componentDidMount() {
    //     firebase.auth().onAuthStateChanged(user = {
    //         if(user) {
    //             this.authHandler({ user });
    //         }
    //     })
    // };

    authHandler = async (authData) => {
        // Look up current store in the firebase database
        const store = await base.fetch(this.props.storeId, { context : this })
        // Claim it if there is no owner
        if (!store.owner) {
            // Save it as our own
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            })
        }
        // Set the state of the inventory component to reflect current user
        this.setState({
            uid: authData.user.uid, 
            owner: store.owner || authData.user.uid
        })
    };

    authenticate = provider => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler)
    };

    logout = async () => {
        await firebase.auth().signOut();
        this.setState({ uid: null })
    };

    render() {
        const logout = <button onClick={this.logout}>Log Out!</button>

        // Check if user is logged in
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate} />
        }
        // Check if user is not the owner of the store
        if (this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry you are not the owner!</p>
                    {logout}
                </div>
            )
        }
        // User is owner, just render the inventory
        return (
            <div className="inventory">
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(key => (
                    <EditFishForm 
                        key = {key} 
                        index = {key}
                        fish = {this.props.fishes[key]} 
                        updateFish = {this.props.updateFish}
                        deleteFish = {this.props.deleteFish}
                    />
                ))}
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSampleFishes}>
                    Load Sample Fishes
                </button>
            </div>
        );
    }
}

export default Inventory

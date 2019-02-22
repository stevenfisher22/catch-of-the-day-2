import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <div className="inventory">
                <h2>Inventory</h2>
                <AddFishForm addFish={this.props.addFish} />
            </div>
        );
    }
}

export default Inventory

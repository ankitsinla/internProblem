import React, {Component} from 'react';

class AddressForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            address:''
        }
    }

    render(){
        return(
            <form className="form form-inline" 
                onSubmit={(e) => {
                    e.preventDefault()
                    this.props.add(this.state.address)
                }}>
                    <div className="card text-center home-card">
                        <div className="card-body">
                            <h5 className="card-title">Add new Address</h5>
                            <div className="form-group mx-sm-3 mb-2">
                                <input
                                    type="text"
                                    onChange={(event) => {
                                        const address = this.input.value.toString()
                                        this.setState({
                                            address: address
                                        })
                                    }}
                                    ref={(input) => { this.input = input }}
                                    className="form-control form-control-lg"
                                    placeholder="Enter name"/>
                                    <button type="submit" className="btn btn-primary mb-2">Submit</button>
                            </div>
                        </div>
                    </div>
               
                
            </form>
        )
    }
}

export default AddressForm
import React, {Component} from 'react';

class UserBalance extends Component {
    constructor(props){
        super(props)
        console.log(this.props.address)
    }
    render(){
        const row = this.props.address.map((add,ind) => {
            return (<tr key={ind}>
                        <td>{add}</td>
                        <td>{this.props.balance[ind]}</td>
                    </tr>)
        })
        return(
            <>
                {this.props.address.length > 0 ? (
                    <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Address</th>
                        <th scope="col">Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {row}
                </tbody>
                </table>
                )
            : <h3>NO user added</h3>}
            </> 
            
        )
    }
}

export default UserBalance
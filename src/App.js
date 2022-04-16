import React, { Component } from 'react';
import './App.css';
import Admin from './abis/Admin.json';
import Web3 from 'web3';
import AddressForm from './components/AddressForm';
import UserBalance from './components/UserBalance';

class App extends Component{
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockChainData()
    
  }

  async loadBlockChainData(){
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    console.log(accounts[0]);
    this.setState({account : accounts[0]})

    //load Ecommerce contract
    const abi = Admin.abi
    const networkId = await web3.eth.net.getId()
    const AdminData = Admin.networks[networkId]
    if(AdminData){
      const admin = new web3.eth.Contract(abi,AdminData.address)
      this.setState({admin})
    }else{
      window.alert('Token contract not deployes to detected network')
    }
  }

  async loadWeb3(){
    
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable()
    }
    else if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else{
      window.alert('Non-ethereum browser , pleases install metamask')
    }
  }

  constructor(props){
    super(props)
    this.state= {
      account:'',
      admin:{},
      addresses:[],
      balance:[]
    }
  }

  addAddress = async (address) => {
    await this.state.admin.methods.addAddress(address).send({from:this.state.account})
    .on('receipt',(res) => {
      console.log("address added",res.events.addressAdded.returnValues.newAddress);
      this.getAddress();
    })
  } 

  getAddress = async () => {
    await this.state.admin.methods.getAllAddress().call({from:this.state.account})
    .then((res) => {
      this.setState({
        addresses:[]
      });
      this.setState(prevState => ({
        addresses:[...prevState.addresses, res]
      }));
      console.log('getting address',this.state.addresses);
      this.getBalance();
    })
  }

  getBalance = async () => {
    await this.state.admin.methods.getAllAddressBalances().call({from:this.state.account})
    .then((res) => {
      this.setState({
        balance:res
      });
      console.log('getting balance',this.state.balance);
    })
  }


  dispersal = async () =>{
    this.state.admin.methods.dispersal().call({from:this.state.account})
    .then((res) => {
      console.log(res)
      this.getAddress()
      
    })
  }

  render(){
    return (
      <div className="App">
        intern
        <button onClick={this.dispersal} type="primary">Update Balance</button>
        <AddressForm add={this.addAddress}/>
        <UserBalance address={this.state.addresses} balance={this.state.balance}/>
      </div>
    );
  }
}

export default App;

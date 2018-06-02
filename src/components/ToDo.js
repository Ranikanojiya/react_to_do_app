import React from 'react'
import AddOption from './AddOption';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal';

class ToDo extends React.Component {
    state={
        options:[],
        selectedOption:undefined
    };

    handleAddOption=(option)=>{

        if(!option){
            return 'Enter Valid Value to add Item';
        }
        else if(this.state.options.indexOf(option)>-1){
            return 'This Item is already Exist';
        }

        this.setState((prevState) => ({ options:prevState.options.concat([option])}));
    }
    
    handleDeleteOptions=()=>{
        this.setState((prevState) => ({options: []}));
    }

     handleDeleteOption=(optionToRemove)=>{
        this.setState((prevState)=> ({
            options:prevState.options.filter((option)=> option !== optionToRemove )
        }));
    }

    handlePick=()=>{
        const randNum = Math.floor(Math.random() * this.state.options.length);
        const op = this.state.options[randNum];
        this.setState(() => ({ selectedOption:op}));
    }

    handleClearSelectedOption=()=>{
        this.setState(() => ({ selectedOption:undefined}));
    }
    
    componentDidMount(){

        try{
                const json = localStorage.getItem('options');
                const options = JSON.parse(json);
                
                if(options){
                    this.setState(()=>({options}));
                }
        }
        catch(e){

        }
       
    }

     componentDidUpdate(prevProps,prevState){

        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            console.log(json);
            localStorage.setItem('options',json);
        }
        
    }

    componentWillUnmount(){
        console.log('WillUnmount');
    }

    render(){
        const title ="To Do App";
        const subtitle ="Keep Yourself Upto date";
        return(
            <div id="app">
                <Header title={ title } subtitle={ subtitle }/>
                <div className="container">
                    <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick}/>
                    <div className="option-container">
                        <Options options={this.state.options} handleDeleteOptions={this.handleDeleteOptions}  handleDeleteOption={this.handleDeleteOption}/>
                        <AddOption handleAddOption={this.handleAddOption}/>
                    </div>
                </div>
                <OptionModal selectedOption={this.state.selectedOption} handleClearSelectedOption={this.handleClearSelectedOption} />
            </div>
        )
    }
}



export default  ToDo;
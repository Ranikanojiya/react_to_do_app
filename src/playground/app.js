class ToDo extends React.Component {

    constructor(props){
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick=this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state={
            options:props.options
        };
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

    handleAddOption(option){

        if(!option){
            return 'Enter Valid Value to add Item';
        }
        else if(this.state.options.indexOf(option)>-1){
            return 'This Item is already Exist';
        }

        this.setState((prevState) => ({ options:prevState.options.concat([option])}));
    }
    
    handleDeleteOptions(){
        this.setState((prevState) => ({options: []}));
    }

     handleDeleteOption(optionToRemove){
        this.setState((prevState)=> ({
            options:prevState.options.filter((option)=> option !== optionToRemove )
        }));
    }

    handlePick(){
        const randNum = Math.floor(Math.random() * this.state.options.length);
        const op = this.state.options[randNum];
        alert(op);
    }

    render(){
        const title ="To Do App";
        const subtitle ="Put your life in hands of computer";
        return(
            <div id="app">
                <Header title={ title } subtitle={ subtitle }/>
                <Options options={this.state.options} handleDeleteOptions={this.handleDeleteOptions}  handleDeleteOption={this.handleDeleteOption}/>
                <AddOption handleAddOption={this.handleAddOption}/>
                <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick}/>
            </div>
        )
    }
}

ToDo.defaultProps = {
    options:[]
}

const Header = function(props){
    return(
            <div> 
                <h1>{props.title}</h1>
                <h2>{props.subtitle}</h2>
            </div>
        );
}

// class Header extends React.Component {
//     render(){
//         console.log(this.props);
//         return(
//             <div> 
//                 <h1>{this.props.title}</h1>
//                 <h2>{this.props.subtitle}</h2>
//             </div>
//         );
//     }
// }

const Action = function(props) {
    return(
                <div>
                    <button disabled={!props.hasOptions} onClick={props.handlePick}>What should I do ?</button>                                             
                </div>
        );
}
// class Action extends React.Component {

//     render(){
//         return(
//                 <div>
//                     <button disabled={!this.props.hasOptions} onClick={this.props.handlePick}>What should I do ?</button>                                             
//                 </div>
//         );
//     }
// }

const Options = function(props){
    return(
            <div>
                    {props.options.length === 0 && <p>Please add an option to get started</p>}
                    <button onClick={props.handleDeleteOptions}>Remove All</button>      
                    <ol>
                         { props.options.map((option) => <Option key={option} optionText={option} handleDeleteOption={props.handleDeleteOption}/>) }      
                    </ol>
            </div>
        );
}

// class Options extends React.Component {

//     render() {
//         return(
//             <div>
//                     <h1>Length is : {this.props.options.length}</h1>
//                     <button onClick={this.props.handleDeleteOptions}>Remove All</button>      
//                     <ol>
//                          { this.props.options.map((option) => <Option key={option} optionText={option} />) }      
//                     </ol>
//             </div>
//         );
//     }
// }

const Option = function(props){
    return (
            <div>
                {props.optionText} <button onClick={(e)=>{
                    props.handleDeleteOption(props.optionText);
                }}>Remove</button>
            </div>
        )
}

// class Option extends React.Component {
//     render() {
//         return (
//             <div>
//                 <li>{this.props.optionText}</li>
//             </div>
//         )
//     }
// }

class AddOption extends React.Component {

    constructor(props)
    {
        super(props);
        this.handleAddOption=this.handleAddOption.bind(this);
        this.state = {
            error:undefined
        };
    }

    handleAddOption(e){
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);

        this.setState(()=>({ error }));

        if(!error){
            e.target.elements.option.value='';
        }
    }

    render() {
        return(
            <div>
                { this.state.error && <p>{ this.state.error }</p> }
                <form onSubmit={ this.handleAddOption } >
                    <input type='text' name="option"/>
                    <button >Add Option</button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<ToDo/>,document.getElementById('root'));
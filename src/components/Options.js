import React from 'react'
import Option from './Option';

const Options = (props)=> (
        <div>
                <div className="head">
                        <h1>Your Options </h1>
                       
                        <button onClick={props.handleDeleteOptions}>Remove All</button>      
                </div>        
                         {props.options.length === 0 && <p className="container-message">Please add an option to get started</p>}
                        
                        { props.options.map((option,index) => <Option key={option} optionText={option} handleDeleteOption={props.handleDeleteOption}/>) }      
                        
        </div>
    );


export default  Options;
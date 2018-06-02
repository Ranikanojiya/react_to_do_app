import React from 'react';

const Option = function(props){
    return (
            <div className="option">
              <p className="option-text">{props.optionText}</p><button onClick={(e)=>{
                    props.handleDeleteOption(props.optionText   );
                }}>Remove</button>
            </div>
        )
}

export default  Option;
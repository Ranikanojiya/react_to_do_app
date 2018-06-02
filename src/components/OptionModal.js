import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const OptionModal = (props) => (
    <Modal
        isOpen={!!props.selectedOption}
        onRequestClose={props.handleClearSelectedOption}
        contentLabel="Select Option"
    >
        <h3>Selected Option</h3>
        {props.selectedOption && <p>{props.selectedOption}</p>}

        <button button onClick={props.handleClearSelectedOption}>Okay</button>
    </Modal>
);


export default OptionModal;
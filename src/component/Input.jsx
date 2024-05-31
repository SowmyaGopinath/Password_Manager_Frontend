import React from "react";

const Input = (props) => {
    return <div className="input-wrapper">
        <input
            type={props.type}
            id={props.label}
            value={props.value}
            name={props.name}
            placeholder={props.placeholder}
            onChange={props.onChange}
            disabled={props.disabled}
            required
        />
    </div>
};

const SignUpInput = (props) => {
    return  <div className="form-floating">
        <input type={props.type} className="form-control" value={props.value} id={props.id} placeholder={props.placeholder} onChange={props.onChange} required/>
        <label htmlFor={props.id}>{props.placeholder}</label> 
    </div>
}

export {Input,SignUpInput};
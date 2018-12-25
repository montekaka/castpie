import React from 'react';
import {
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
 } from 'reactstrap';

 const SbInputGroup = (props) => {
   return (
     <div>
      <InputGroup>
        <Input type="text" value={props.inputValue} name={props.inputName} onChange={props.handleChange}/>
        <InputGroupAddon addonType="prepend" onClick={props.handleClick}><Button>Go</Button></InputGroupAddon>
      </InputGroup>
     </div>
   )
 }

 export default SbInputGroup;
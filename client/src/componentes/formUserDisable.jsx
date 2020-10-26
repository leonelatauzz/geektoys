import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';

export default function formUserDisable() {
    return (
        <div>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label style={{fontSize:'22px'}}>Cuéntanos tu experiencia o razón para desactivar la cuenta:</Form.Label>
                    <div>
                    <textarea style={{width:'600px', height:'100px'}} placeholder="Motivo"></textarea>
                    </div>
                    
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label style={{fontSize:'22px'}}>Califica tu experiencia</Form.Label>
                    <Form.Control style={{ marginLeft: '50px', width: '100px', height:'40px' }} as="select" className="mr-sm-2" id="inlineFormCustomSelect" custom>
                        <option value="1">5</option>
                        <option value="2">4</option>
                        <option value="3">3</option>
                        <option value="4">2</option>
                        <option value="5">1</option>
                    </Form.Control>
                </Form.Group>
                <button style={{ margin: 'auto', width: '100px'}} class='tbe100' type="submit">Bloquear</button>
            </Form>
        </div>
    )

}

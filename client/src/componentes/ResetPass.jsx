import React , {useState} from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap'
import {useHistory, useParams} from 'react-router-dom';
import axios from 'axios';



export default function ResetPass() {

    const history = useHistory();
    const params = useParams();
    
    
    const [data, setState] = useState({
        password: ''
    })

    const handleChange = (e) =>{
        setState({
            ...data,
            password: e.target.value
        })
    }


    const handlSubmit = async (e) => {
        e.preventDefault();
        const json = {
            password: data.password
        }
        const password = await axios.post(`http://localhost:3001/user/${params.id}/passwordReset` ,json, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(pass =>{
            console.log('CASI QUE NO')
        })
        
    }

    return (
        <div>
            <Form>
                <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Password
    </Form.Label>
                    <Col sm="10">
                        <Form.Control onChange={handleChange} type="password" placeholder="Password" />
                    </Col>
                </Form.Group>
                <Button onClick={handlSubmit} variant="primary">Cambiar</Button>{' '}
            </Form>
        </div>
    )


}
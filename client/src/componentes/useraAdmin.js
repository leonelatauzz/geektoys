import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import SuperSimpleNavbarAd from './SuperSimpleNavbarAdmin'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from "react-redux";


export default function Promote() {
  const history = useHistory();
  const userData = useSelector(state => state.userId);
  const [usuarios, setUsuarios] = useState({
    usuario: []
  });

  useEffect(() => {
    async function makeRequests() {
      await Axios.get('http://localhost:3001/user')
        .then(user => {

          setUsuarios({
            ...usuarios,
            usuario: user.data
          })
        })
    }
    makeRequests();



  }, [])


  const btnAdmin = async (e) => {
    e.preventDefault();
    const res = await Axios.put(`http://localhost:3001/user/${e.target.value}/Promote`)
      .then(async (user) => {
        const resDos = await Axios.get('http://localhost:3001/user')
          .then(users => {
            setUsuarios({
              ...usuarios,
              usuario: users.data
            })
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Usuario modificado correctamente',
              showConfirmButton: false,
              timer: 1500
            }).then(()=> {
              window.location.reload()
            })
             
          })
      })

  }


  const btnUser = async (e) => {
    e.preventDefault();
    const res = await Axios.put(`http://localhost:3001/user/${e.target.value}/Despromote`)
      .then(async (user) => {
        const resDos = await Axios.get('http://localhost:3001/user')
          .then(users => {
            setUsuarios({
              ...usuarios,
              usuario: users.data
            })
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Usuario modificado correctamente',
              showConfirmButton: false,
              timer: 1500
            }).then(()=> {
              window.location.reload()
            })
          })
      })
  }

 
  const users = usuarios.usuario.filter((user)=>{
    if(user.id !== userData.id){
      return user
    }
  })
  console.log(users)



  return (
    <div>
      <SuperSimpleNavbarAd />
      <div style={{ width: '70%', margin: 'auto' }}>

        <Table striped bordered hover style={{backgroundColor: 'white'}}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th >e-mail</th>
              <th>Role</th>
              <th>Estado</th>
              <th>Promover</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{userData.id}</td>
              <td>{userData.name}</td>
              <td>{userData.email}</td>
              <td>{userData.role}</td>
              <td>{userData.state}</td>
              <td> <button disabled='true' className='bot' style={{ margin: "30px" }} > User </button></td>
            </tr>
          </tbody>
          <tbody>
            {users.map(e => <tr>
              <td>{e.id}</td>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.role}</td>
              <td>{e.state}</td>
              <td>
                {e.role === 'Admin' ? <button disabled={e.state === 'Baja'} className='bot' value={e.id} style={{ margin: "30px" }} onClick={btnUser}> User </button>
                  : <button disabled={e.state === 'Baja'} className='bot' value={e.id} style={{ margin: "30px" }} onClick={btnAdmin}> Admin </button>

                }

              </td>
            </tr>
            )}


          </tbody>
          
        </Table>



      </div>
    </div>

  )

}
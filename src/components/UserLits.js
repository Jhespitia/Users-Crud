import React, { useState, useEffect} from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

const UserLits = () => {

    const [users, setUsers] = useState ([]);

    useEffect (() => {
        axios.get('https://users-crud1.herokuapp.com/users/')
       .then (res => setUsers(res.data))
    }, []);

    console.log(users)

      const [modalEditar, setModalEditar] = useState(false);
      const [modalEliminar, setModalEliminar] = useState(false);
      const [modalInsertar, setModalInsertar] = useState(false);
    
      const [userSelected, setUserSelected] = useState({
        id: '',
        first_name: '',
        last_name: '',
        birthday: '',
        email: '',
        password: '',
      });
    
      const selectUser=(elemento, caso)=>{
        setUserSelected(elemento);
    (caso==='Edit')?setModalEditar(true):setModalEliminar(true)
      }
    
      const handleChange=e=>{
        const {name, value}=e.target;
        setUserSelected((prevState)=>({
          ...prevState,
          [name]: value
        }));
      }
    
      const edit=()=>{
        var dataNueva=users;
        dataNueva.map(user=>{
          if(user.id===userSelected.id){
              user.first_name=userSelected.first_name;
              user.last_name=userSelected.last_name;
              user.birthday=userSelected.birthday;
              user.email=userSelected.email;
              user.password=userSelected.password;
          }
        });
        setUsers(dataNueva);
        setModalEditar(false);
      }
    
      const remove =()=>{
        setUsers(users.filter(user=>user.id!==userSelected.id));
        setModalEliminar(false);
      }
    
      const abrirModalInsertar=()=>{
        setUserSelected(null);
        setModalInsertar(true);
      }
    
      const insertar =()=>{
        var valorInsertar=userSelected;
        valorInsertar.id=users[users.length-1].id+1;
        var dataNueva = users;
        dataNueva.push(valorInsertar);
        setUsers(dataNueva);
        setModalInsertar(false);
      }

  return (

    <div>
        <h1 className='title'>Users</h1>
        <br />
    <button className="btn btn-danger" onClick={()=>abrirModalInsertar()}>New User
    </button>
    <br />
    <br />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th className='SubTitle'>ID <i className='ico fa-solid fa-id-badge'></i></th>
            <th className='SubTitle'>NAME <i className='ico fa-solid fa-user'></i></th>
            <th className='SubTitle'>lAST NAME <i className='ico fa-solid fa-user'></i></th>
            <th className='SubTitle'>D.O.B <i className='ico fa-solid fa-cake-candles'></i></th>
            <th className='SubTitle'>EMAIL <i className='ico fa-solid fa-envelope'></i></th>
            <th className='SubTitle'>PASSWORD <i className='ico fa-solid fa-key'></i></th>
            <th className='SubTitle'>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>(
            <tr key={user.id}>
              <td className='info'>{user.id}</td>
              <td className='info'>{user.first_name}</td>
              <td className='info'>{user.last_name}</td>
              <td className='info'>{user.birthday}</td>
              <td className='info'>{user.email}</td>
              <td className='info'>{user.password}</td>

              <td>
                  <button className="btn btn-secondary" onClick={()=>selectUser(user, 'Edit')}>Edit
                  </button> {"   "} 
                  
                  <button className="btn btn-danger" onClick={()=>selectUser(user, 'Remove')}>Remove</button>
                </td>
            </tr>
          ))
          }
        </tbody>
      </table>

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3 className='title'>Update User</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>
            <i className='ico fa-solid fa-id-badge'></i>
            </label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={userSelected && userSelected.id}
            />
            <br />

            <label>
                <i className='ico fa-solid fa-user'></i>
            </label>
            <input
              className="form-control"
              type="text"
            //   name="nombre"
              name="first_name"
              value={userSelected && userSelected.first_name}
              onChange={handleChange}
            />
            <br />

            <label>
                <i className='ico fa-solid fa-user'></i>
            </label>
            <input
              className="form-control"
              type="text"
              name="last_name"
              value={userSelected && userSelected.last_name}
              onChange={handleChange}
            />
            <br />

            <label>
                <i className='ico fa-solid fa-cake-candles'></i>
            </label>
            <input
              className="form-control"
              type="text"
              name="birthday"
              value={userSelected && userSelected.birthday}
              onChange={handleChange}
            />
            <br />

            <label>
                <i className='ico fa-solid fa-envelope'></i>
            </label>
            <input
              className="form-control"
              type="text"
              name="email"
              value={userSelected && userSelected.email}
              onChange={handleChange}
            />
            <br />

            <label>
                <i className='ico fa-solid fa-key'></i>
            </label>
            <input
              className="form-control"
              type="text"
              name="password"
              value={userSelected && userSelected.password}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-secondary" onClick={()=>edit()}>
            Update
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalEditar(false)}
          >
            Cancel
          </button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalEliminar}>
        <ModalBody>
          You sure, you want to Delete the user "{userSelected && userSelected.first_name}" ?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>remove()}>
            Yes
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>


        <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3 className='title'>New User</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>
            <i className='ico fa-solid fa-id-badge'></i>
            </label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={userSelected ? userSelected.id: ''}
            />
            <br />

            <label>
                <i className='ico fa-solid fa-user'></i>
            </label>
            <input
              className="form-control"
              type="text"
              name="first_name"
              value={userSelected ? userSelected.first_name: ''}
              onChange={handleChange}
              placeholder='Your Name'
            />
            <br />

            <label>
                <i className='ico fa-solid fa-user'></i>
            </label>
            <input
              className="form-control"
              type="text"
              name="last_name"
              value={userSelected ? userSelected.last_name: ''}
              onChange={handleChange}
              placeholder='Your last name'
            />
            <br />
            
            <label>
                <i className='ico fa-solid fa-cake-candles'></i>
            </label>
            <input
              className="form-control"
              type="text"
              name="birthday"
              value={userSelected ? userSelected.birthday: ''}
              onChange={handleChange}
              placeholder='(aaaa-mm-dd)'
              
            />
            <br />

            <label>
                <i className='ico fa-solid fa-envelope'></i>
            </label>
            <input
              className="form-control"
              type="text"
              name="email"
              value={userSelected ? userSelected.email: ''}
              onChange={handleChange}
              placeholder='Your email'
            />
            <br />

            <label>
                <i className='ico fa-solid fa-key'></i>
            </label>
            <input
              className="form-control"
              type="text"
              name="password"
              value={userSelected ? userSelected.password: ''}
              onChange={handleChange}
              placeholder='Your password'
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-secondary"
          onClick={()=>insertar()}>
            Create
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalInsertar(false)}
          >
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default UserLits;


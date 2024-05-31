import React, { useState} from "react";
import AddAppPropTable from "./AddAppPropTable";
import { useDispatch, useSelector } from "react-redux";
import { webClient } from "../util/config";
import { API } from "../util/constants";
import { updateUser} from '../redux/slice/userSlice';

const AddApp = () => {
  const [app, saveApp] = useState({
    name: '',
    password: '',
    additionalProperties: []
  });
  const [pwdMatched, setPwdMatched] = useState(true);
  const {user} = useSelector(store => store.user);
  const [rowCount, setRowCount] = useState(0);
  const dispatch = useDispatch();
  // const modalRef = useRef(null);

  const onAddAppSubmit = (event) => {
    event.preventDefault();
    if (app.name.trim() === '') {
      console.log('application name is empty');
    } else if (app.password.trim() === '') {
      console.log('password is empty');
    } else {
      const req = {
        email:user.email,
        app: app
      };
      console.log(req);
      webClient.post(API.ENDPOINT_ADD_APP, req, { timeout: 5000 })
        .then(resp => {
          console.log(`${app.name} added successfully`);
          dispatch(updateUser(resp.data));
          console.log(resp.data);
          var modalElement = document.getElementById('addAppModal');
          var modal = bootstrap.Modal.getInstance(modalElement);
          setRowCount(0);
          modal.hide();
          saveApp({
            name: '',
            password: '',
            additionalProperties: []
          });
          // if (modalRef.current) {
          //   const modalInstance = new bootstrap.Modal(modalRef.current);
          //   modalInstance.hide();
          // }
        }).catch(err => {
          console.log(err);
          console.log('Failed to add app. Please try again.');
        });
    }
  };

  const onFormChange = (event) => {
    saveApp({ ...app, [event.target.name]: event.target.value });
  };

  const onConfirmPasswordChange = (event) => {
    const confirmPassword = event.target.value;
    if (confirmPassword !== '' && confirmPassword !== app.password) {
      setPwdMatched(false);
    } else {
      setPwdMatched(true);
    }
  };

  return (
    <div className="modal modal-lg fade" id="addAppModal" tabIndex="-1" aria-labelledby="addAppModal" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="addAppModalLabel">Add Application</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form onSubmit={onAddAppSubmit} method="POST">
            <div className="modal-body">
              <label className='form-label' htmlFor="appName">Application Name </label>
              <input className='form-control' name="name" type='text' value={app.name} onChange={onFormChange} required 
                onInvalid={e => e.target.setCustomValidity('application name cannot be blank')} onInput={e => e.target.setCustomValidity('')}
              />
              <label className='form-label' htmlFor="password">Password </label>
              <input className='form-control' name="password" type='password' value={app.password} onChange={onFormChange} required 
                onInvalid={e => e.target.setCustomValidity('password cannot be blank')} onInput={e => e.target.setCustomValidity('')}
              />
               <label className='form-label' htmlFor="confirmPassword">Confirm Password </label>
              <input className='form-control' name="confirmPassword" type='password' onChange={onConfirmPasswordChange} required 
                onInvalid={e => e.target.setCustomValidity('confirmPassword cannot be blank')} onInput={e => e.target.setCustomValidity('')}
              /> 
              {!pwdMatched && <p className='text-danger'>*password mismatch</p>}
              <button type="button" className="btn btn-outline-primary mt-4" onClick={() => setRowCount(prevCount => prevCount + 1)}>Additional Properties</button>
              <AddAppPropTable rowCount={rowCount} />
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">Add</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setRowCount(0)}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddApp;

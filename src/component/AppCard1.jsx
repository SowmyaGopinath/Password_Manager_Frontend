import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useSelector } from "react-redux";
import DeleteAppModal from "./Modal";

const AppCard1 = ({ appName, appPassword}) => {
    const user = useSelector(store => store.user);
    const maskedAppPassword= appPassword!=null?"**********":"";
    const [isVisible, setVisible] = useState(false);
    console.log(user.user.email,appName);

    return  <div className="col mb-4 app-card">
                <div className="card h-100">
                    <div className="d-flex flex-row-reverse gap-2 icon">
                        <DeleteAppModal appName={appName} email={user.user.email}/>
                        <button  isicon="true" className="btn rounded-circle b-0 del-icon"  data-bs-toggle="modal" data-bs-target="#deleteAppModal"><DeleteIcon/></button>
                        {/* <button  className="btn rounded-circle b-0"><EditIcon/></button> */}
                    </div>
                    <div className="card-body">
                        <h5>App Name : {appName}</h5><hr/>
                        <div className="eye-container eye-icon"> 
                            <h6>Password  : {isVisible?appPassword:maskedAppPassword} </h6>
                            <button className="btn rounded-circle b-0" onClick={() => setVisible(prev=> !prev)}>
                                {isVisible?<VisibilityIcon/>:<VisibilityOffIcon/>}
                            </button>
                        </div>
                    </div>
                    <div className="apps-footer icon">
                        <button isicon="true" className="btn rounded-circle b-0"><OpenWithIcon/></button>
                    </div>
                </div>
            </div>
        
};

export default AppCard1;
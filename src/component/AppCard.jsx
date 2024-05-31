import React, { useState } from "react";
import defaultAppLogo from '../assets/img/default_app_logo.svg';
import expand from '../assets/img/expand.svg';
import contract from '../assets/img/contract.svg';
import icon_visibility from '../assets/img/icon_visibility.svg';
import icon_visibility_off from '../assets/img/icon_visibility_off.svg';
import delete_bin from '../assets/img/delete_bin.svg';
import Icon from './Icon.jsx';

const AppCard = ({ appName, appPassword ,appId}) => {
    const [isExpanded, setExpanded] = useState(false);
    const [isVisible, setVisible] = useState(false);
    // const dispatch = useDispatch();

    // const handleDeleteApp = (appId) => {
    //     axios.post(ENDPOINT_DELETE_APP, { appId })
    //         .then(response => {
    //             dispatch(deleteApp({ appId }));
    //         })
    //         .catch(error => {
    //             console.error("Error deleting app:", error);
    //         });
    // };
    console.log("Rendering AppCard:", appName, appPassword);
    return (
        <div className="card custom-card w-50 rounded">

            <div className="d-flex flex-row-reverse gap-2">
                <Icon src={delete_bin} />
            </div>
            <div className="card-body">
                <h5 className="card-title"><img src={defaultAppLogo} className="rounded-circle img-thumbnail app-logo" /> {appName}</h5>
                <hr />
                <div className="d-flex flex-row-reverse gap-2">
                    <Icon src={isExpanded? contract:expand} toggleIcon={() => setExpanded(prev => !prev)}/>
                    <div>
                        <Icon src={isVisible? icon_visibility_off: icon_visibility} toggleIcon={() => setVisible(prev => !prev)}/>
                    </div>
                    <input  type='password' className="flex-fill border-0" value={appPassword} readOnly></input>
                </div>
            </div>
        </div>);
};

export default AppCard;
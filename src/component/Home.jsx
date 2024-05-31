import React,{ useEffect } from "react";
import { useSelector } from "react-redux";
import AddAppForm from './AddAppForm';
import AppCard from "./AppCard";
import add_app_plus from '../assets/img/add_app_plus.svg';
import Icon from "./Icon";



export default () => {
    const {user,apps} = useSelector(store => store.user);
    useEffect(() => {
        console.log('Current user state:', user);
    }, [user]);
    // if (!user || !user.apps) {
    //     return <div>No apps to display</div>;
    // }
    return (<>
        <h1>{user.username || 'please login'}</h1>
        <AddAppForm />
        <div className="card-group custom-card-group mt-5 p-4">
        <div className="card add-app-card w-50 rounded img-thumbnail">
        <img style={{cursor:"pointer"}} src={add_app_plus} className="rounded-circle img-thumbnail app-logo" data-bs-toggle="modal" data-bs-target="#addAppModal"/>
        </div>
        {/* {Array.isArray(user.apps) && user.apps.map((app, index) => (
                    <AppCard key={index} appName={app.name} appPassword={app.password} />
                ))} */}
        { user.apps.map((app, index) => (<AppCard key={index} appName={app.name} appPassword={app.password}/>))}
        </div>
    </>);
}
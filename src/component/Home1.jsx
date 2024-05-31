import React from "react";
import AddIcon from '@mui/icons-material/Add';
import AddAppForm from './AddAppForm';
import AppCard1 from './AppCard1';
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slice/userSlice'; // Assuming userSlice.js is in the same directory

function Home1() {
    const {user,apps} = useSelector(state => state.user); // Selecting only the 'user' slice
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // if (!user || !user.apps) {
    //     return <div>No apps to display</div>;
    // }

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };
    console.log(user,apps);

    return (
        <div>
            <h4 className="home-page-header">
                Welcome {user && user.username}
                <button className='flex-end' onClick={handleLogout}>LogOut</button>
            </h4>
            <AddAppForm />
            <div className="container">
                <div className="row row-cols-1 row-cols-md-4 row-cols-sm-3 cards-container">
                    <div className="col mb-4 app-card">
                        <div className="card h-100">
                            <div className="card-body add-card">
                                <button data-bs-toggle="modal" data-bs-target="#addAppModal"><AddIcon /></button>
                            </div>
                        </div>
                    </div>
                    {user.apps && user.apps.map((app, index) => (
                        
                        <AppCard1 key={index} appName={app.name} appPassword={app.password}  />
                    ))}
                     {/* {Array.isArray(user.apps) && user.apps.map((app, index) => (
                    <AppCard1 key={index} appName={app.name} appPassword={app.password} />
                ))} */}
                </div>
            </div>
        </div>
    );
}

export default Home1;

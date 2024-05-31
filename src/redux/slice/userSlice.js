import { createSlice } from '@reduxjs/toolkit';

// const initialStateValue = {};

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isAuthenticated: false,
        apps:[],
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
            //state.apps=action.payload.apps||[];
            
        },
        logout: (state, action) => {
            state.user = null;
            state.isAuthenticated = false;
            state.apps = [];
           
        },
        updateUser: (state, action) => {
            if (state.user) {
                state.user = {
                    ...state.user,
                    email: action.payload.email,
                    apps: action.payload.apps, // update the apps array directly
                };
            }
            // state.user = {
            //     ...state.user,
            //     email: action.payload.email
            //     apps: action.payload.apps
            // };
            
        },
        deleteApp: (state, action) => {
            state.apps = state.apps
        }
    }
})
export const {login, logout, updateUser,deleteApp} = userSlice.actions;
export default userSlice.reducer;
//filter(app => app._id !== action.payload.appId);
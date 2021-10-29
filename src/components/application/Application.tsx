import React, { useEffect, useState } from 'react'
import Feed from 'components/application/components/feed/Feed'
import NavBar from 'components/application/components/NavBar'
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect,
    useHistory,
    useRouteMatch,
} from 'react-router-dom'
import Connections from 'components/application/components/connections/Connections'
import Profile from './components/profile/Profile'
import Teams from './components/teams/Teams'
import Notifications from './components/notifications/Notifications'
import Settings from './components/settings/Settings'
import Messages from './components/messages/Messages'
import { useDispatch, useSelector } from 'react-redux'
import {
    handleUserCredsChange,
    handleUserInfoChange,
} from '../../StateUpdateHelper'
import CheckoutPage from 'components/authentication/userInfoForm/Info/CheckoutPage'
import { userConstants } from 'redux/actionTypes/userConstants'
import axios from 'axios'
import { userCredsConstants } from 'redux/actionTypes/userCredsConstants'
import PrivateRoute from '../../PrivateRoute'
import userDataConstants from 'redux/actionTypes/userDataConstants'
import { userInfoConstants } from 'redux/actionTypes/userInfoConstants'
import PostPage from './components/postpage/PostPage'
import OtherProfile from './components/otheruserprofile/OtherProfile'
import OtherUserTeams from './components/otheruserteam/OtherUserTeam'
import IdeaPage from './components/ideapage/IdeaPage'

function Application() {
    const state = useSelector((state: any) => state)
    const dispatch = useDispatch()
    const history = useHistory()
    const isAuthenticated = useState(false)

    let { path, url } = useRouteMatch()

    useEffect(() => {
        if (localStorage.getItem('user')) {
            // dispatch({type: userConstants.LOGIN_SUCCESS, user: {
            //     profile_completed: false;
            // }})
            axios
                .get(
                    'https://cg2nx999xa.execute-api.ap-south-1.amazonaws.com/dev/user',
                    {
                        headers: {
                            Authorization: localStorage.getItem('user'),
                        },
                    }
                )
                .then(async (resp: any) => {
                    console.log('user api call:', resp)
                    dispatch({
                        type: userConstants.LOGIN_SUCCESS,
                        user: {
                            profile_complete:
                                resp.data.data.user[0].profile_complete,
                        },
                    })
                    ;(async () => {
                        dispatch({
                            type: userInfoConstants.UPDATE_WHOLE_PROFILE,
                            data: resp.data.data.user[0],
                        })
                    })().then(() => {
                        if (!state.userInfo.profile_complete) {
                            console.log(state.userInfo.profile_complete)
                            // alert(
                            //     'Your profile is not complete, please complete it by giving the following information.'
                            // )
                        }
                    })
                })
                .then(() => {
                    console.log(
                        'profile status: ',
                        state.userInfo.profile_complete
                    )
                })
                .catch((err) => {
                    console.log(err)
                    // alert(err.message)
                    // history.push('/login')
                })
        } else {
            history.push('/login')
        }
    }, [])
    return (
        <div className="application">
            <Router>
                {/* {state.authentication.userAuthenticated &&
                    state.authentication.user.profile_complete && <NavBar />} */}
                    <NavBar/>
                <Switch>
                    <PrivateRoute
                        path={`${path}/feed`}
                        isAuth={state.authentication.userAuthenticated}
                        component={Feed}
                    />
                    <PrivateRoute
                        path={`${path}/connections`}
                        isAuth={state.authentication.userAuthenticated}
                        component={Connections}
                    />
                    <PrivateRoute
                        path={`${path}/profile`}
                        isAuth={state.authentication.userAuthenticated}
                        component={Profile}
                    />
                    <PrivateRoute
                        path={`${path}/teams`}
                        isAuth={state.authentication.userAuthenticated}
                        component={Teams}
                    />
                    <PrivateRoute
                        path={`${path}/notifications`}
                        isAuth={state.authentication.userAuthenticated}
                        component={Notifications}
                    />
                    <PrivateRoute
                        path={`${path}/settings`}
                        isAuth={state.authentication.userAuthenticated}
                        component={Settings}
                    />
                    <PrivateRoute
                        path={`${path}/messages`}
                        isAuth={state.authentication.userAuthenticated}
                        component={Messages}
                    />
                    <PrivateRoute
                        path={`${path}/userinfo`}
                        isAuth={state.authentication.userAuthenticated}
                        component={CheckoutPage}
                    />
                    <PrivateRoute
                        path={`${path}/otherprofile`}
                        isAuth={state.authentication.userAuthenticated}
                        component={OtherProfile}
                    />
                     <PrivateRoute
                        path={`${path}/otherteams`}
                        isAuth={state.authentication.userAuthenticated}
                        component={OtherUserTeams}
                    />
                    <PrivateRoute
                        path={`/posts/:id`}
                        isAuth={state.authentication.userAuthenticated}
                        component={() => <PostPage />}
                    />
                    <PrivateRoute
                        path={`/ideas/:id`}
                        isAuth={state.authentication.userAuthenticated}
                        component={() => <IdeaPage />}
                    />
                </Switch>
            </Router>
        </div>
    )
}

export default Application

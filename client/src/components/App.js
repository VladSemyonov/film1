import React, {useState, useEffect} from "react"
import {Route} from "react-router-dom"
import Film from "./films/Film"
import TopNavigation from "./TopNavigation"
import {Async, lazyImport} from './Async'
import {setAuthorizationHeader} from '../utils'
import jwtDecode from 'jwt-decode'

const HomePage = Async(lazyImport('./HomePage'))
const FilmsPage = Async(lazyImport('./FilmsPage'))
const SignupPage = Async(lazyImport('./SignupPage'))
const LoginPage = Async(lazyImport('./LoginPage'))

const AppContext = React.createContext()
export {AppContext}

const App = () => {
    const [user, setUser] = useState({role: 'user', token: ''})
    const [message, setMessage] = useState('')
    const isUserAdmin = user.role === 'admin'

    useEffect(() => {
        if (localStorage.filmsToken) {
            setUser({
                role: jwtDecode(localStorage.filmsToken).user.role,
                token: localStorage.filmsToken,
            })
            setAuthorizationHeader(localStorage.filmsToken)
        }
    }, [])

    const login = token => {
        setUser({
            role: jwtDecode(token).user.role,
            token
        })
        localStorage.filmsToken = token
        setAuthorizationHeader(token)
    }

    const logout = () => {
        setUser({role: 'user', token: ''})
        setAuthorizationHeader()
        delete localStorage.filmsToken
    }

    return (
        <div className="ui container">
            <TopNavigation logout={logout} isAuth={user.token} isAdmin={isUserAdmin}/>
            {message && (
                <div className='ui info message'>
                    <i className='close icon' onClick={() => setMessage('')} />
                    {message}
                </div>
            )}

            <Route exact path="/" component={HomePage} />
            <Route path="/films" render={props => <FilmsPage {...props} user={user} />} />
            <Route path="/film/:_id" exact component={Film} />
            <Route
                path='/signup'
                render={props => (
                    <SignupPage {...props} setMessage={setMessage} />
                )}
            />
            <Route path='/login' render={props => <LoginPage {...props} login={login} />} />
        </div>
    )
}

export default App

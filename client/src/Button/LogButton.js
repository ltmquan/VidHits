import React from 'react'
import {Button} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'

export default function LogButton() {
    const history = useHistory()
    const handleSignup = () => {
        history.push('/signup')
    }
    const handleLogin = () => {
        history.push('/login')
    }

    return (
        <div className='logButtonGroup'>
            <Button variant="outline-danger" size="lg" onClick={handleLogin}>Login</Button>{' '}
            <Button variant="outline-danger" size="lg" onClick={handleSignup}>Signup</Button>{' '}
        </div>
    )
}

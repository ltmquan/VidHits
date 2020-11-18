import React from 'react'
import {Button} from 'react-bootstrap'

export default function LogButton() {
    return (
        <div className='logButtonGroup'>
            <Button variant="outline-danger" size="lg">Login</Button>{' '}
            <Button variant="outline-danger" size="lg">Logout</Button>{' '}
        </div>
    )
}

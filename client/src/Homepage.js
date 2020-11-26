import React, {useEffect, useState} from 'react'
import NavigationBar from './NavBar/NavigationBar'
import client from './axios'
import './css/styles.css'

export default function Homepage() {
    const [nameNavBar, setnameNavBar] = useState('')
    const [logOutButton, setlogOutButton] = useState(false)
    useEffect(() => {
        client.get('/profile').then(res => {
            console.log(res.data)
            setnameNavBar(res.data)
        })
        client.get('/logout').then(res => {
            if (res.data === 'User is logged out successfully') {
                setlogOutButton(true)
            }
        })
    })
    return (
        <div>
            <NavigationBar nameNavBar={nameNavBar} logOutButton= {logOutButton}/>
            <h1 className='searchBar'>Search Bar will appear here after we implement the Youtube API</h1>
        </div>
    )
}

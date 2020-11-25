import React, {useEffect, useState} from 'react'
import NavigationBar from './NavBar/NavigationBar'
import client from './axios'

export default function Homepage() {
    const [nameNavBar, setnameNavBar] = useState('')
    useEffect(() => {
        client.get('/profile').then(res => {
            console.log(res.data)
            setnameNavBar(res.data)
        })
    })
    return (
        <div>
            <NavigationBar nameNavBar={nameNavBar}/>
        </div>
    )
}

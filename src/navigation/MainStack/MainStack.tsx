import React from 'react'
import NavStack from '../NavStack/NavStack'
import { NavigationContainer } from '@react-navigation/native'

const MainStack: React.FC = () => {
    return (
        <NavigationContainer>
            <NavStack />
        </NavigationContainer>
    )
}

export default MainStack
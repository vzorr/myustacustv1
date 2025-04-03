import { Text, View } from 'react-native'
import React from 'react'
import { UserNavigationRootProps } from '../../../types/stacksParams'
import AccountBasicInfoUi from './AccountBasicInfoUi'

const AccountBasicInfo: React.FC<UserNavigationRootProps<"AccountBasicInfo">> = (props) => {
    return (
        <AccountBasicInfoUi />
    )
}

export default AccountBasicInfo

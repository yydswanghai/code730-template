import { ConfigProvider, theme } from 'antd'
import type { ThemeConfig } from 'antd'
import React from 'react'

type IProps = {
    children: React.ReactNode
}
/**
 * 主题
 */
export const config: ThemeConfig = {
    token: {
        colorPrimary: '#7DBCEA'
    },
    algorithm: theme.defaultAlgorithm
}

const Provider: React.FC<IProps> = ({ children }) => {
    return (<ConfigProvider theme={config}>
        {children}
    </ConfigProvider>)
}

export default Provider;
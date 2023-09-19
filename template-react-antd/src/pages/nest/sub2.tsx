import React from 'react'
import { Outlet } from 'umi'

export default function sub2() {
    return (
        <div>
            子菜单/sub2
            <Outlet/>
        </div>
    )
}

import { http } from './http'

export async function getPreEditMyInfo() {
    http.request({
        method: 'get',
        url: '/v2/api/gdzyz/manage/pc/usersAdmin/preEditMyInfo',
    })
}
import { MockMethod } from 'vite-plugin-mock'
import { mock, Random } from 'mockjs'

function getTokenResult(type: number) {
    let access_token = '80768e78-f985-4b16-b351-bce45d189daa';
    let refresh_token = 'dfaf78d9-a023-425c-b6b0-e792ddec282f';
    let clientId = 'pc_manage';
    if(type === 1){
        access_token = '7dd50837-d723-4e34-bc5a-5c3d0786487a';
        refresh_token = '1d8113c8-bef1-4378-8ad1-33b23b2ea146';
        clientId = 'app_person_user';
    }else if(type === 2){
        access_token = 'ff25c026-bcf2-407c-bda1-5fe9699a9c21';
        refresh_token = 'b80d2f87-4e95-4aed-b8d9-c82758ad5e13';
        clientId = 'app_collective_user';
    }
    return {
        code: 0,
        data: {
            access_token,
            refresh_token,
            clientId,
            expires_in: 7199,
            token_type: 'bearer'
        },
        msg: 'ok',
    }
}

function getUserInfo(type: number) {
    let id = '01';
    let username = 'Admin';
    if(type === 1){
        id = '02';
        username = Random.cname();
    }else if(type === 2){
        id = '03';
        username = Random.cname();
    }
    return {
        code: 0,
        data: mock({
            info: {
                'id': id,
                'username': username,
                'updateTime': '@datetime(yyyy-MM-dd A HH:mm:ss)',
                'createTime': '@datetime(yyyy-MM-dd A HH:mm:ss)',
                'phone': /1[3579]\d{8}/,
                'createBy': '@datetime',
                'parentOid': '@id'
            },
            permissions: null
        }),
        msg: 'ok'
    }
}

export default [
    {
        url: '/admin/oauth/token',
        method: 'post',
        response: (opt: { query:  Record<string, any> }) => {
            const { scope, type } = opt.query;
            if(scope === 'app' && type === '1'){
                return getTokenResult(1)
            }else if(scope === 'app' && type === '2'){
                return getTokenResult(2)
            }if(scope === 'server'){
                return getTokenResult(3)
            }else{
                return {
                    code: 1002,
                    data: null,
                    msg: '参数错误'
                }
            }
        }
    },
    {
        url: '/admin/loginInfo',
        method: 'get',
        response: (opt: { query:  Record<string, any> }) => {
            const { type } = opt.query;
            if(type === '1'){
                return getUserInfo(1)
            }else if(type === '2'){
                return getUserInfo(2)
            }else if(type === '3'){
                return getUserInfo(3)
            }else{
                return {
                    code: 1003,
                    data: null,
                    msg: '参数错误'
                }
            }
        }
    },
    {
        url: '/admin/logout',
        method: 'delete',
        response: () => {
            return {
                code: 0,
                data: null,
                msg: 'ok'
            }
        }
    }
] as MockMethod[]
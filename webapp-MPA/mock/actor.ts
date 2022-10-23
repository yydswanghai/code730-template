import { MockMethod } from 'vite-plugin-mock'

export default [
    {
        url: '/getHotActorList',
        method: 'get',
        response: () => {
            return {
                code: 200,
                data: [
                    {
                        "imgURL" : "/mockdata/actors/jiabing.jpeg",
                        "title" : "贾冰"
                    },
                    {
                        "imgURL" : "/mockdata/actors/qiude.jpeg",
                        "title" : "裘德·洛"
                    },
                    {
                        "imgURL" : "/mockdata/actors/renmin.jpeg",
                        "title" : "任敏"
                    },
                    {
                        "imgURL" : "/mockdata/actors/yuwenwen.jpeg",
                        "title" : "于文文"
                    },
                    {
                        "imgURL" : "/mockdata/actors/zhangchenguang.jpeg",
                        "title" : "张晨光"
                    },
                    {
                        "imgURL" : "/mockdata/actors/jiantian.jpeg",
                        "title" : "菅田将晖"
                    },
                    {
                        "imgURL" : "/mockdata/actors/youcunjiachun.jpeg",
                        "title" : "有村架纯"
                    },
                    {
                        "imgURL" : "/mockdata/actors/xinyunlai.jpeg",
                        "title" : "辛云来"
                    },
                    {
                        "imgURL" : "/mockdata/actors/wensong.jpeg",
                        "title" : "文松"
                    },
                    {
                        "imgURL" : "/mockdata/actors/yuehan.jpeg",
                        "title" : "约翰·布莱德利"
                    }
                ],
                msg: 'OK'
            }
        }
    }
] as MockMethod[]
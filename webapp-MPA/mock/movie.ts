import { MockMethod } from 'vite-plugin-mock'

export default [
    {
        url: '/getHotMovieList',
        method: 'get',
        response: () => {
            return {
                code: 200,
                data: [
                    {
                        "title": "神奇动物:邓布利多之谜",
                        "imgURL": "/mockdata/movies/shenqidongwu.jpeg",
                        "score": "9.0",
                        "mainActor": "埃迪·雷德梅恩,艾莉森·苏朵儿,裘德·洛",
                        "isIMAX": "true",
                        "theaterCount": "40",
                        "playCount": "835",
                        "wantSeeCount": "252131",
                        "releaseDate" : "2022-04-22",
                        "releaseLocation" : "中国大陆"
                    },
                    {
                        "title": "长津湖之水门桥",
                        "imgURL": "/mockdata/movies/changjinhu.png",
                        "score": "9.6",
                        "mainActor": "吴京,易烊千玺,朱亚文",
                        "isIMAX": "true",
                        "theaterCount": "75",
                        "playCount": "1020",
                        "wantSeeCount": "252131",
                        "releaseDate" : "2022-04-22",
                        "releaseLocation" : "中国大陆"
                    },
                    {
                        "title": "奇迹·笨小孩",
                        "imgURL": "/mockdata/movies/benxiaohai.jpeg",
                        "score": "9.5",
                        "mainActor": "易烊千玺,田雨,陈哈琳",
                        "isIMAX": "true",
                        "theaterCount": "10",
                        "playCount": "16",
                        "wantSeeCount": "252131",
                        "releaseDate" : "2022-04-22",
                        "releaseLocation" : "中国大陆"
                    },
                    {
                        "title": "花束般的恋爱",
                        "imgURL": "/mockdata/movies/huashubanlianai.jpeg",
                        "score": "9.0",
                        "mainActor": "有村架纯,菅田将晖,细田佳央太",
                        "isIMAX": "false",
                        "theaterCount": "17",
                        "playCount": "30",
                        "wantSeeCount": "252131",
                        "releaseDate" : "2022-04-22",
                        "releaseLocation" : "中国大陆"
                    },
                    {
                        "title": "精灵旅社4：变身大冒险",
                        "imgURL": "/mockdata/movies/jinglinglvshe.jpeg",
                        "score": "9.0",
                        "mainActor": "埃迪·雷德梅恩,艾莉森·苏朵儿,裘德·洛",
                        "isIMAX": "false",
                        "theaterCount": "95",
                        "playCount": "692",
                        "wantSeeCount": "252131",
                        "releaseDate" : "2022-04-22",
                        "releaseLocation" : "中国大陆"
                    },
                    {
                        "title": "密室逃生2",
                        "imgURL": "/mockdata/movies/mishitaosheng.jpeg",
                        "score": "8.4",
                        "mainActor": "泰勒·拉塞尔,洛根·米勒,霍兰·罗登",
                        "isIMAX": "false",
                        "theaterCount": "83",
                        "playCount": "249",
                        "wantSeeCount": "252131",
                        "releaseDate" : "2022-04-22",
                        "releaseLocation" : "中国大陆"
                    },
                    {
                        "title": "神秘海域",
                        "imgURL": "/mockdata/movies/shenmihaiyu.jpeg",
                        "score": "8.6",
                        "mainActor": "汤姆·赫兰德,马克·沃尔伯格,索菲娅·阿里",
                        "isIMAX": "true",
                        "theaterCount": "33",
                        "playCount": "58",
                        "wantSeeCount": "252131",
                        "releaseDate" : "2022-04-22",
                        "releaseLocation" : "中国大陆"
                    },
                    {
                        "title": "我们的冬奥",
                        "imgURL": "/mockdata/movies/womendedongao.jpeg",
                        "score": "9.3",
                        "mainActor": "冰墩墩,雪容融,刘思奇",
                        "isIMAX": "false",
                        "theaterCount": "3",
                        "playCount": "4",
                        "wantSeeCount": "252131",
                        "releaseDate" : "2022-04-22",
                        "releaseLocation" : "中国大陆"
                    },
                    {
                        "title": "误杀瞒天记",
                        "imgURL": "/mockdata/movies/wushamantianji.jpeg",
                        "score": "9.2",
                        "mainActor": "阿贾耶·德乌干,塔布,施芮娅·萨兰",
                        "isIMAX": "false",
                        "theaterCount": "75",
                        "playCount": "196",
                        "wantSeeCount": "252131",
                        "releaseDate" : "2022-04-22",
                        "releaseLocation" : "中国大陆"
                    },
                    {
                        "title": "喜羊羊与灰太狼之筐出未来",
                        "imgURL": "/mockdata/movies/xiyangyang.png",
                        "score": "9.3",
                        "mainActor": "祖晴,邓玉婷,陈瑞",
                        "isIMAX": "true",
                        "theaterCount": "40",
                        "playCount": "835",
                        "wantSeeCount": "252131",
                        "releaseDate" : "2022-04-22",
                        "releaseLocation" : "中国大陆"
                    },
                    {
                        "title": "月球陨落",
                        "imgURL": "/mockdata/movies/yueqiuyunluo.jpeg",
                        "score": "8.1",
                        "mainActor": "哈莉·贝瑞,帕特里克·威尔森,约翰·布莱德利",
                        "isIMAX": "true",
                        "theaterCount": "78",
                        "playCount": "190",
                        "wantSeeCount": "252131",
                        "releaseDate" : "2022-04-22",
                        "releaseLocation" : "中国大陆"
                    },
                    {
                        "title": "这个杀手不太冷静",
                        "imgURL": "/mockdata/movies/zhegeshashou.jpeg",
                        "score": "9.1",
                        "mainActor": "马丽,魏翔,陈明昊",
                        "isIMAX": "false",
                        "theaterCount": "28",
                        "playCount": "64",
                        "wantSeeCount": "252131",
                        "releaseDate" : "2022-04-22",
                        "releaseLocation" : "中国大陆"
                    },
                    {
                        "title": "新蝙蝠侠",
                        "imgURL": "/mockdata/movies/bianfuxia.jpeg",
                        "score": "7.9",
                        "mainActor": "罗伯特·帕丁森,佐伊·克拉维兹,杰弗里·怀特",
                        "isIMAX": "true",
                        "theaterCount": "25",
                        "playCount": "32",
                        "wantSeeCount": "252131",
                        "releaseDate" : "2022-04-22",
                        "releaseLocation" : "中国大陆"
                    }
                ],
                msg: 'OK'
            }
        }
    }
] as MockMethod[]
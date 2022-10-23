import { MockMethod } from 'vite-plugin-mock'

export default [
    {
        url: '/getTheaterList',
        method: 'get',
        response: () => {
            return {
                code: 200,
                data: {
                    "theaterData": [
                        {
                            "theaterName": "嘉莱国际影城（金科路店）",
                            "theaterAddr": "金牛区金科西路58号（负一楼）",
                            "allowRefund": true,
                            "endorse": true,
                            "snack": true,
                            "vipTag": true,
                            "startPrice": 19.9
                        },
                        {
                            "theaterName": "大地悦影绘影城（激光杜比百货店）",
                            "theaterAddr": "新都区新中路77号懿润百货五楼",
                            "allowRefund": true,
                            "endorse": true,
                            "snack": false,
                            "vipTag": true,
                            "startPrice": 29.9
                        },
                        {
                            "theaterName": "太平洋影城（彭州店）",
                            "theaterAddr": "彭州市天彭镇金彭东路122号置信逸都购物中心三楼",
                            "allowRefund": true,
                            "endorse": false,
                            "snack": true,
                            "vipTag": true,
                            "startPrice": 19.9
                        },
                        {
                            "theaterName": "中影盛世影城（大丰圣迈德店）",
                            "theaterAddr": "新都区大丰街道蓉北路二段168号1栋3层1号附2-3号",
                            "allowRefund": true,
                            "endorse": false,
                            "snack": false,
                            "vipTag": true,
                            "startPrice": 19.9
                        },
                        {
                            "theaterName": "嘉莱巨幕国际影城（华宇广场店）",
                            "theaterAddr": "锦江区沙河街道上沙河铺街789号华宇广场二楼",
                            "allowRefund": true,
                            "endorse": true,
                            "snack": true,
                            "vipTag": true,
                            "startPrice": 19.9
                        },
                        {
                            "theaterName": "联娱国际影城（兰天店）",
                            "theaterAddr": "金堂县赵镇街道新建路133号兰天城市广场5号楼四楼",
                            "allowRefund": false,
                            "endorse": true,
                            "snack": false,
                            "vipTag": true,
                            "startPrice": 19.9
                        },
                        {
                            "theaterName": "橙天国际影城（成都Upark公园店）",
                            "theaterAddr": "武侯区高新区盛治街838号C栋3楼",
                            "allowRefund": false,
                            "endorse": true,
                            "snack": true,
                            "vipTag": false,
                            "startPrice": 19.9
                        },
                        {
                            "theaterName": "中影飞尚国际影城",
                            "theaterAddr": "新都区新都街道电子路388号海伦城市广场4楼",
                            "allowRefund": true,
                            "endorse": true,
                            "snack": false,
                            "vipTag": true,
                            "startPrice": 19.9
                        },
                        {
                            "theaterName": "嘉莱炜岸国际影城",
                            "theaterAddr": "龙泉驿区驿都西路3666号41栋3层1号",
                            "allowRefund": true,
                            "endorse": false,
                            "snack": true,
                            "vipTag": true,
                            "startPrice": 19.9
                        },
                        {
                            "theaterName": "太平洋影城（师大店）",
                            "theaterAddr": "龙泉驿区大面街道龙城大道728号",
                            "allowRefund": true,
                            "endorse": true,
                            "snack": true,
                            "vipTag": true,
                            "startPrice": 19.9
                        }
                    ],
                    "areaData": [
                        {
                            "areaName": "全部",
                            "areaNumber": 299
                        },
                        {
                            "areaName": "武侯区",
                            "areaNumber": 42
                        },
                        {
                            "areaName": "双流区",
                            "areaNumber": 26
                        },
                        {
                            "areaName": "成华区",
                            "areaNumber": 30
                        },
                        {
                            "areaName": "郫都区",
                            "areaNumber": 28
                        },
                        {
                            "areaName": "新都区",
                            "areaNumber": 17
                        },
                        {
                            "areaName": "锦江区",
                            "areaNumber": 29
                        },
                        {
                            "areaName": "金牛区",
                            "areaNumber": 26
                        },
                        {
                            "areaName": "青羊区",
                            "areaNumber": 21
                        },
                        {
                            "areaName": "龙泉驿区",
                            "areaNumber": 18
                        },
                        {
                            "areaName": "温江区",
                            "areaNumber": 15
                        },
                        {
                            "areaName": "都江堰区",
                            "areaNumber": 26
                        },
                        {
                            "areaName": "金堂县",
                            "areaNumber": 26
                        },
                        {
                            "areaName": "崇州市",
                            "areaNumber": 26
                        },
                        {
                            "areaName": "青白江区",
                            "areaNumber": 26
                        },
                        {
                            "areaName": "彭州市",
                            "areaNumber": 26
                        },
                        {
                            "areaName": "邛崃市",
                            "areaNumber": 26
                        },
                        {
                            "areaName": "大邑县",
                            "areaNumber": 26
                        },
                        {
                            "areaName": "蒲江区",
                            "areaNumber": 26
                        },
                        {
                            "areaName": "简阳市",
                            "areaNumber": 26
                        }
                    ],
                    "streetData": [
                        {
                            "streetName": "全部",
                            "streetNumber": 42
                        },
                        {
                            "streetName": "高新区",
                            "streetNumber": 42
                        },
                        {
                            "streetName": "科华北路",
                            "streetNumber": 42
                        },
                        {
                            "streetName": "玉林/芳草街",
                            "streetNumber": 42
                        },
                        {
                            "streetName": "双楠",
                            "streetNumber": 42
                        },
                        {
                            "streetName": "武侯祠",
                            "streetNumber": 42
                        },
                        {
                            "streetName": "中粮大悦城",
                            "streetNumber": 42
                        },
                        {
                            "streetName": "保利花园",
                            "streetNumber": 42
                        },
                        {
                            "streetName": "红牌楼",
                            "streetNumber": 42
                        },
                        {
                            "streetName": "簇桥",
                            "streetNumber": 42
                        },
                        {
                            "streetName": "金花",
                            "streetNumber": 42
                        },
                        {
                            "streetName": "高升桥",
                            "streetNumber": 42
                        },
                        {
                            "streetName": "龙湖金楠天街",
                            "streetNumber": 42
                        },
                        {
                            "streetName": "机投",
                            "streetNumber": 42
                        },
                        {
                            "streetName": "伊藤/世豪广场",
                            "streetNumber": 42
                        },
                        {
                            "streetName": "武侯万达",
                            "streetNumber": 42
                        },
                        {
                            "streetName": "磨子桥",
                            "streetNumber": 42
                        }
                    ],
                    "theaterClassificationData": [
                        {
                            "theaterClassificationName": "全部",
                            "theaterClassificationNumber": 299
                        },
                        {
                            "theaterClassificationName": "太平洋电影城",
                            "theaterClassificationNumber": 42
                        },
                        {
                            "theaterClassificationName": "万达影城",
                            "theaterClassificationNumber": 42
                        },
                        {
                            "theaterClassificationName": "星美国际影城",
                            "theaterClassificationNumber": 42
                        },
                        {
                            "theaterClassificationName": "保利国际影城",
                            "theaterClassificationNumber": 42
                        },
                        {
                            "theaterClassificationName": "CGV影城",
                            "theaterClassificationNumber": 42
                        },
                        {
                            "theaterClassificationName": "横店影城",
                            "theaterClassificationNumber": 42
                        },
                        {
                            "theaterClassificationName": "EVO艺威影城",
                            "theaterClassificationNumber": 42
                        },
                        {
                            "theaterClassificationName": "橙天嘉禾影城",
                            "theaterClassificationNumber": 42
                        },
                        {
                            "theaterClassificationName": "UME影城",
                            "theaterClassificationNumber": 42
                        },
                        {
                            "theaterClassificationName": "保利万和国际影城",
                            "theaterClassificationNumber": 42
                        },
                        {
                            "theaterClassificationName": "卢米埃影城",
                            "theaterClassificationNumber": 42
                        },
                        {
                            "theaterClassificationName": "星光影城",
                            "theaterClassificationNumber": 42
                        },
                        {
                            "theaterClassificationName": "金逸影城",
                            "theaterClassificationNumber": 42
                        },
                        {
                            "theaterClassificationName": "幸福蓝海国际影城",
                            "theaterClassificationNumber": 42
                        },
                        {
                            "theaterClassificationName": "大地影城",
                            "theaterClassificationNumber": 42
                        },
                        {
                            "theaterClassificationName": "中影南方国际影城",
                            "theaterClassificationNumber": 42
                        },
                        {
                            "theaterClassificationName": "苏宁影城",
                            "theaterClassificationNumber": 42
                        },
                        {
                            "theaterClassificationName": "橙天国际影城",
                            "theaterClassificationNumber": 42
                        }
                    ],
                    "labelData": [
                        {
                            "specialFunc": [
                                {
                                    "labelName": "全部"
                                },
                                {
                                    "labelName": "可改签"
                                },
                                {
                                    "labelName": "可退票"
                                }
                            ],
                            "specialTheater": [
                                {
                                    "labelName": "全部"
                                },
                                {
                                    "labelName": "IMAX厅"
                                },
                                {
                                    "labelName": "CGS中国巨幕厅"
                                },
                                {
                                    "labelName": "杜比全景声厅"
                                },
                                {
                                    "labelName": "4DX厅"
                                },
                                {
                                    "labelName": "儿童厅"
                                },
                                {
                                    "labelName": "4K厅"
                                },
                                {
                                    "labelName": "40帧厅"
                                },
                                {
                                    "labelName": "60帧厅"
                                },
                                {
                                    "labelName": "巨幕厅"
                                },
                                {
                                    "labelName": "IMAX厅"
                                },
                                {
                                    "labelName": "CGS中国巨幕厅"
                                },
                                {
                                    "labelName": "杜比全景声厅"
                                },
                                {
                                    "labelName": "4DX厅"
                                },
                                {
                                    "labelName": "儿童厅"
                                },
                                {
                                    "labelName": "4K厅"
                                },
                                {
                                    "labelName": "40帧厅"
                                },
                                {
                                    "labelName": "60帧厅"
                                },
                                {
                                    "labelName": "巨幕厅"
                                },
                                {
                                    "labelName": "IMAX厅"
                                },
                                {
                                    "labelName": "CGS中国巨幕厅"
                                },
                                {
                                    "labelName": "杜比全景声厅"
                                },
                                {
                                    "labelName": "4DX厅"
                                },
                                {
                                    "labelName": "儿童厅"
                                },
                                {
                                    "labelName": "4K厅"
                                },
                                {
                                    "labelName": "40帧厅"
                                },
                                {
                                    "labelName": "60帧厅"
                                },
                                {
                                    "labelName": "巨幕厅"
                                }
                            ]
                        }
                    ]
                },
                msg: 'OK'
            }
        }
    }
] as MockMethod[]
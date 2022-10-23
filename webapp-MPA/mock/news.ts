import { MockMethod } from 'vite-plugin-mock'

export default [
    {
        url: '/getHotNewsList',
        method: 'get',
        response: () => {
            return {
                code: 200,
                data: [
                    {
                        "newsName": "1.《边缘行者》特辑尽展“老男孩”情深 任贤齐任达..."
                    },
                    {
                        "newsName": "2. 刘德华力荐的江湖片，是正邪对立，还是手足兄弟？"
                    },
                    {
                        "newsName": "3.《迷你世界之觉醒》更新角色卡片图"
                    },
                    {
                        "newsName": "4.《迷你世界之觉醒》曝熊孩子捣蛋正片片段"
                    },
                    {
                        "newsName": "5.《神奇动物：邓布利多之谜》“整装待发”片段纽..."
                    },
                    {
                        "newsName": "6. IMAX在京举行“神奇动物开放日”观影活动聚焦珍..."
                    },
                    {
                        "newsName": "7. 全国热映中！合家欢动画电影《草原大作战》大战..."
                    },
                    {
                        "newsName": "8. 乱世江湖与浓墨重彩兄弟情这部港片打包奉上"
                    },
                    {
                        "newsName": "9. 电影《人世间》二轮点映好评如潮 春暖花开静待上映"
                    },
                    {
                        "newsName": "10. 《神奇动物：邓布利多之谜》“魔咒学教授”特辑..."
                    }
                ],
                msg: 'OK'
            }
        }
    }
] as MockMethod[]
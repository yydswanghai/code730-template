import { http } from './http'

/* 获取热门影人 */
export function getHotActor() {
    return http.request({
        method: 'get',
        url: '/getHotActorList'
    })
}
/* 获取热门影视 */
export function getHotMovie() {
    return http.request({
        method: 'get',
        url: '/getHotMovieList'
    })
}
/* 获取热门娱乐新闻数据 */
export function getHotNews() {
    return http.request({
        method: 'get',
        url: '/getHotNewsList'
    })
}
/* 获取影院剧场数据 */
export function getTheater() {
    return http.request({
        method: 'get',
        url: '/getTheaterList'
    })
}
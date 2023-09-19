import type { DvaModel } from 'umi'

export interface TagItem {
    key: string
    parentKey: string | null
    to: string
    name: string
}

interface IState {
    tagsList: TagItem[]
    BreadList: TagItem[]
    defaultTag: TagItem|null
}

/* 不需要出现标签页中的路由 */
const whiteList: string[] = []

const model: DvaModel<IState> = {
    namespace: 'tagsView',
    state: {
        tagsList: [],
        BreadList: [],
        defaultTag: null
    },
    reducers: {
        addTags(state, action){
            let item = action.payload as TagItem;
            if(whiteList.includes(item.to)){
                return state;
            }
            // 去重
            if(state.tagsList.map(it => it.key).includes(item.key)){
                return state;
            }
            return {
                ...state,
                tagsList: [...state.tagsList, item]
            };
        },
        setDefaultTag(state, { payload }){
            return {
                ...state,
                defaultTag: payload
            }
        },
        delTags(state, { payload }){// payload: key
            // 如果只有一个还要求关闭当前最后一个的情况，给他默认的
            if(state.tagsList.length === 1 && state.defaultTag){
                return {
                    ...state,
                    tagsList: [state.defaultTag]
                }
            }
            return {
                ...state,
                tagsList: state.tagsList.filter(it => it.key !== payload)
            };
        },
        delOther(state, { payload }){// payload: key
            return {
                ...state,
                tagsList: state.tagsList.filter(it => it.key === payload)
            }
        },
        delAll(state){
            // 保证清空的时候至少有一个默认
            if(state.defaultTag){
                const tag = state.tagsList.find(it => it.to === state.defaultTag!.to);
                if(tag){
                    return {
                        ...state,
                        tagsList: [tag]
                    }
                }else{
                    return {
                        ...state,
                        tagsList: [state.defaultTag]
                    }
                }
            }
            return {
                ...state,
                tagsList: [],
            }
        },
        changeBread(state, { payload }){
            return {
                ...state,
                BreadList: [...payload]
            }
        }
    }
}

export default model
import { defineMock } from 'umi'
import menus from './menus.json'

export default defineMock({
    'GET /v2/api/gdzyz/manage/pc/usersAdmin/preEditMyInfo': (req, res) => {
        res.status(200).json({
            code: '1',
            data: {
                adminId: "ff8080814b01bb74014b14a78db136f5",
                createTime: "2015-01-23 00:00:00",
                detectStatus: 2,
                districtId: "40288188119c102f01119cadc42d01d0",
                districtName: "中国",
                email: "2037321281@qq.com",
                emailValid: 1,
                forbiddenState: 2,
                groupId: 1,
                groupName: "超级管理员",
                idcardCode: "gd_super",
                idcardType: 10000,
                idpicPath: "/upload/orgRegisterPic/idcard/20220809/1660029603568.jpg",
                lastUpdateTime: "2022-08-09 15:20:59",
                loginName: "gd_super",
                mobile: "18050034919",
                mobileValid: 0,
                receivType: 0,
                regionId: 2012,
                status: 1,
                userName: "广东省超级管理员"
            },
            msg: '操作成功'
        })
    },
    'GET /v2/api/gdzyz/manage/pc/common/menutree/leftMenu': (req, res) => {
        res.status(200).json({
            code: '1',
            msg: '操作成功',
            ...menus
        })
    }
})
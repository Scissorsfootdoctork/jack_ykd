// import Admin from "../pages/admin";
// import Home from "../pages/home";
// import User from "../pages/user";
// import UserTwo from "../pages/usertow";

// import Demo1 from "../pages/routerDemo/demo1";
// import Demo2 from "../pages/routerDemo/demo2";
// import Demo3 from "../pages/routerDemo/demo3";
// interface router {
//     path:string,
//     component:any,
//     children?:Array<router>
// }

// const routers:Array<router> = [
//     {
//         path:'/',
//         component:Admin,
//         children:[
//             {
//                 path:'/demo1',
//                 component:Demo1
//             },
//             {
//                 path:'/demo2',
//                 component:Demo2
//             },
//             {
//                 path:'/demo3',
//                 component:Demo3
//             }
//         ]
//     },
//     {
//         path:'/home',
//         component:Home
//     },
//     {
//         path:'/user',
//         component:User
//     },
//     {
//         path:'/:userId',
//         component:UserTwo
//     }
// ]
// export default routers



import Main from "../pages/main";
import CarouselPage from "../pages/CarouselPage";
import BalanceSheet from '../pages/compontents/BalanceSheet'//生产平衡状况
import DayProduction from '../pages/compontents/DayProduction'//当天产量报表
import DayTarget from '../pages/compontents/DayTarget'//当天目标与产量
import ProcessWork from '../pages/compontents/ProcessWork'//工序返工率状况
import ReworkTarget from '../pages/compontents/ReworkTarget'//当天返工目标与返工率

import StaffWork from '../pages/compontents/StaffWork'//员工效率与返工率
import StaffWorkFull from '../pages/compontents/StaffWorkFull'//员工效率与返工率

import H_BalanceSheet from '../pages/compontents/hcharts/H_BalanceSheet'//生产平衡状况【3D】
import H_ProcessWork from '../pages/compontents/hcharts/H_ProcessWork'//工序返工率状况【3D】



interface router {
    path:string,
    component:any,
    children?:Array<router>
}

const routers:Array<router> = [  
    {
        path:'/',
        component:Main
    },
    {
        path:'/0',
        component:CarouselPage
    },
    {
        path:'/1',
        component:BalanceSheet
    }
    ,
    {
        path:'/2',
        component:DayProduction
    }
    ,
    {
        path:'/3',
        component:DayTarget
    }
    ,
    {
        path:'/4',
        component:ProcessWork
    }
    ,
    {
        path:'/5',
        component:ReworkTarget
    }
    ,
    {
        path:'/6',
        component:StaffWork
    }
    ,
    {
        path:'/60',
        component:StaffWorkFull
    }
    ,
    {
        path:'/7',
        component:H_BalanceSheet
    }
    ,
    {
        path:'/8',
        component:H_ProcessWork
    }
]
export default routers
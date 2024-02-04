import { atom } from "recoil";


export const userAtom=atom({
    key:"userInfo",
    default:"U"
})

export const balanceAtom=atom({
    key:"balancAtom",
    default:""
})

export const filterAtom=atom({
    key:"filterAtom",
    default:""
})

export const searchListAtom=atom({
    key:"searchList",
    default:[]
})

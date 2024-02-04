import { atom } from "recoil";


export const firstNameAtom=atom({
    key:"fname",
    default:""
})

export const lastNameAtom=atom({
    key:"lname",
    default:""
})

export const emailAtom=atom({
    key:"email",
    default:""
})

export const passAtom=atom({
    key:"pass",
    default:""
})

import { redirect } from "react-router-dom"
export function requireAuth(user, request){
    console.log("request:", request.request.url, "user:", user)
    const pathname = new URL(request.request.url).pathname
    if (user) 
        return user
    else
        throw redirect('/login'+`?redirectTo=${pathname}&message=You must login first`)
}

export function capitalizeFirstChar(string){
    return (string.charAt(0).toUpperCase() + string.slice(1))
}

export const allMonths = {   
    0:'Jan',   
    1:'Feb',   
    2:'Mar',   
    3:'Apr',   
    4:'May',   
    5:'Jun',   
    6:'Jul',   
    7:'Aug',   
    8:'Sep',   
    9:'Oct',   
    10:'Nov',   
    11:'Dec'}
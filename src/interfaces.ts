export interface admin {
    userName: string,
    firstName: string,
    lastName: string,
    password: string,
    suspended : boolean,
    phoneNumber:string
    role: number,    // 0 : admin    1 : superAdmin
}

export interface tokenizationInterface {
    username: string,
    firstName: string,
    lastName: string,
    
    role: number,    // 0 : admin    1 : superAdmin
}


export interface responseInterface{
    
}
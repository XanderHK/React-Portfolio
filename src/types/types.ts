export declare type TokenGet = () => string | undefined
export declare type TokenSet = (param: string) => void
export declare type TokenDestroy = () => void
export declare type IsOnAdminPanel = () => boolean
export declare type SetError = (param: string) => void
export declare type Project = {
    projectdescription: string
    projectid: string
    projectimagepath: string
    projectname: string,
    projectsiteurl: string,
    projectgithuburl: string,
    __v: number
    _id: string
}
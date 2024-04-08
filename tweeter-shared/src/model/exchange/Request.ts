import { AuthToken } from '../domain/AuthToken'
import { Status } from '../domain/Status'
import { User } from '../domain/User'
function parseAuthenticated<ReturnType extends AuthenticatedRequest>(req: ReturnType) {
    if (req.authToken) req.authToken = AuthToken.fromJson(JSON.stringify(req.authToken))!
    return req
}

//I'd probably write this as a class if I were to do it again.
export const requestParser = {
    authenticated: <ReturnType extends AuthenticatedRequest>(req: ReturnType) => {
        return parseAuthenticated<ReturnType>(req)
    },
    getStatusList: (req: GetStatusListRequest) => {
        req = parseAuthenticated(req)
        if (req.user) req.user = User.fromJson(JSON.stringify(req.user))!
        if (req.lastItem) req.lastItem = Status.fromJson(JSON.stringify(req.lastItem))
        return req
    },
    getUserList: (req: GetUserListRequest) => {
        req = parseAuthenticated(req)
        if (req.user) req.user = User.fromJson(JSON.stringify(req.user))!
        if (req.lastItem) req.lastItem = User.fromJson(JSON.stringify(req.lastItem))
        return req
    },
    postStatus: (req: PostStatusRequest) => {
        req = parseAuthenticated(req)
        if (req.newStatus) req.newStatus = Status.fromJson(JSON.stringify(req.newStatus))!
        return req
    },
    getCount: (req: GetCountRequest) => {
        req = parseAuthenticated(req)
        if (req.user) req.user = User.fromJson(JSON.stringify(req.user))!
        return req
    },
    toggleFollow: (req: ToggleFollowRequest) => {
        req = parseAuthenticated(req)
        return req
    },
}
export interface TweeterRequest {}
export interface AuthenticatedRequest extends TweeterRequest {
    authToken: AuthToken
}
export interface LoginRequest extends TweeterRequest {
    username: string
    password: string
}
export interface NoRequestBody extends TweeterRequest {}
export interface RegisterRequest extends TweeterRequest {
    firstName: string
    lastName: string
    alias: string
    password: string
    imageStringBase64: string
}

export interface GetStatusListRequest extends AuthenticatedRequest {
    user: User
    pageSize: number
    lastItem: Status | null
}
export interface GetUserListRequest extends AuthenticatedRequest {
    user: User
    pageSize: number
    lastItem: User | null
}
export interface PostStatusRequest extends AuthenticatedRequest {
    newStatus: Status
}

export interface GetCountRequest extends AuthenticatedRequest {
    user: User
}
export interface ToggleFollowRequest extends AuthenticatedRequest {
    usernameToToggle: string
    user: User
}

export interface GetUserIsFollowingRequest extends AuthenticatedRequest {
    followerUsername: string
    followeeUsername: string
}

export interface GetUserRequest extends TweeterRequest {
    username: string
}

export interface LogoutRequest extends AuthenticatedRequest {}

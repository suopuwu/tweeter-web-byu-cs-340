import { AuthToken } from '../domain/AuthToken'
import { Status } from '../domain/Status'
import { User } from '../domain/User'

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
    userImageBytes: Uint8Array
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
    user: User
    usernameToToggle: string
}

export interface GetUserIsFollowingRequest extends AuthenticatedRequest {
    followerUsername: string
    followeeUsername: string
}

export interface GetUserRequest extends TweeterRequest {
    username: string
}

export interface LogoutRequest extends AuthenticatedRequest {}

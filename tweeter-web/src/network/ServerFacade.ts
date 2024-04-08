import {
    AuthenticateResponse,
    AuthToken,
    LoginRequest,
    TweeterRequest,
    TweeterResponse,
    NoRequestBody,
    GetCountResponse,
    GetStatusListRequest,
    GetStatusListResponse,
    GetUserIsFollowingResponse,
    GetUserListResponse,
    GetUserResponse,
    PostStatusResponse,
    RegisterRequest,
    ToggleFollowRequest,
    ToggleFollowResponse,
    GetUserListRequest,
    PostStatusRequest,
    LogoutRequest,
    GetCountRequest,
    GetUserIsFollowingRequest,
    responseParser,
    GetUserRequest,
} from 'tweeter-shared'
import { ClientCommunicator } from './ClientCommunicator'

export class ServerFacade {
    private SERVER_URL = 'https://a18dq1m8oj.execute-api.us-west-2.amazonaws.com/testing'

    private clientCommunicator = new ClientCommunicator(this.SERVER_URL)

    private async useCommunicator<RequestType extends TweeterRequest, ResponseType extends TweeterResponse>(
        endpoint: string,
        request: RequestType,
        method: string
    ): Promise<ResponseType> {
        const response = await this.clientCommunicator.sendRequest<RequestType>(request, endpoint, method)
        const parsedResponse: ResponseType = JSON.parse(response)
        if (!parsedResponse.success) {
            throw new Error(
                parsedResponse.message ??
                    `Response from ${endpoint} has no success value. The server probably sent an invalid response. Error: ${parsedResponse}`
            )
        }
        return parsedResponse
    }

    private async postFunction<RequestType extends TweeterRequest, ResponseType extends TweeterResponse>(
        endpoint: string,
        request: RequestType
    ): Promise<ResponseType> {
        return await this.useCommunicator<RequestType, ResponseType>(endpoint, request, 'post')
    }

    private async getFunction<ResponseType extends TweeterResponse>(endpoint: string): Promise<ResponseType> {
        return await this.useCommunicator<NoRequestBody, ResponseType>(endpoint, {}, 'get')
    }
    //todolist
    //1. finish error handling
    //2. add documentation in api gateway
    //4. Create automated tests
    //5. create uml diagrams

    signIn = async (request: LoginRequest) =>
        responseParser.authenticate(await this.postFunction<LoginRequest, AuthenticateResponse>('/auth/sign-in', request))

    register = async (request: RegisterRequest) =>
        responseParser.authenticate(await this.postFunction<RegisterRequest, AuthenticateResponse>('/auth/register', request))

    signOut = async (request: LogoutRequest) =>
        responseParser.authenticate(await this.postFunction<NoRequestBody, AuthenticateResponse>('/auth/sign-out', request))

    postStatus = async (request: PostStatusRequest) =>
        await this.postFunction<PostStatusRequest, PostStatusResponse>('/content/post-status', request)

    follow = async (request: ToggleFollowRequest) =>
        await this.postFunction<ToggleFollowRequest, ToggleFollowResponse>(`/u/${request.usernameToToggle}/follow`, request)

    unfollow = async (request: ToggleFollowRequest) =>
        await this.postFunction<ToggleFollowRequest, ToggleFollowResponse>(`/u/${request.usernameToToggle}/unfollow`, request)

    //ones that use get do not have a request body
    getUser = async (request: GetUserRequest) =>
        responseParser.getUser(await this.postFunction<GetUserRequest, GetUserResponse>(`/u/${request.username}`, request))

    getFolloweeCount = async (username: string, request: GetCountRequest) =>
        await this.postFunction<GetCountRequest, GetCountResponse>(`/u/${username}/count/followees`, request)

    getFollowerCount = async (username: string, request: GetCountRequest) =>
        await this.postFunction<GetCountRequest, GetCountResponse>(`/u/${username}/count/followers`, request)

    getUserIsFollowing = async (username: string, comparisonUsername: string, request: GetUserIsFollowingRequest) =>
        await this.postFunction<GetUserIsFollowingRequest, GetUserIsFollowingResponse>(
            `/u/${username}/is-following/${comparisonUsername}`,
            request
        )

    //these ones must use post to have a request body, even if get may appear to fit better
    getFeed = async (request: GetStatusListRequest) =>
        responseParser.getStatusList(await this.postFunction<GetStatusListRequest, GetStatusListResponse>('/content/feed', request))

    getStory = async (request: GetStatusListRequest) =>
        responseParser.getStatusList(await this.postFunction<GetStatusListRequest, GetStatusListResponse>('/content/story', request))

    getFollowees = async (request: GetUserListRequest) =>
        responseParser.getUserList(await this.postFunction<GetUserListRequest, GetUserListResponse>('/content/followees', request))

    getFollowers = async (request: GetUserListRequest) => {
        return responseParser.getUserList(await this.postFunction<GetUserListRequest, GetUserListResponse>('/content/followers', request))
    }
}

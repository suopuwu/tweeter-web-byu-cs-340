import { AuthToken, TweeterRequest } from 'tweeter-shared'

export class ClientCommunicator {
    private SERVER_URL: string
    constructor(SERVER_URL: string) {
        this.SERVER_URL = SERVER_URL
    }

    async sendRequest<T extends TweeterRequest>(req: T, endpoint: string, method: string): Promise<string> {
        const url = this.SERVER_URL + endpoint
        const request = JSON.parse(
            JSON.stringify({
                method: method,
                headers: new Headers({
                    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                }),
                body: method != 'get' ? JSON.stringify(req) : undefined,
            })
        )
        try {
            const resp: Response = await fetch(url, request)
            if (resp.ok) {
                const response: string = await resp.text()
                return response
            } else {
                const error = await resp.json()
                throw new Error(error.errorMessage)
            }
        } catch (err) {
            throw err
        }
    }
}

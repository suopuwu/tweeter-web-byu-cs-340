import { AuthToken, TweeterRequest } from 'tweeter-shared'

export class ClientCommunicator {
    private SERVER_URL: string
    constructor(SERVER_URL: string) {
        this.SERVER_URL = SERVER_URL
    }

    async sendRequest<T extends TweeterRequest>(
        req: T,
        endpoint: string,
        method: string,
        authToken: AuthToken | undefined
    ): Promise<string> {
        const url = this.SERVER_URL + endpoint
        const request = {
            method: method,
            headers: new Headers({
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            }),
            body: JSON.stringify(req ?? {}),
        }
        if (authToken) request.headers.append('Authorization', authToken?.token)
        try {
            const resp: Response = await fetch(url, request)
            if (resp.ok) {
                const response: string = await resp.text()
                console.log('response:', response)
                return response
            } else {
                const error = await resp.json()
                throw new Error(error.errorMessage)
            }
        } catch (err) {
            throw new Error('Client communicator sendRequest failed:\n' + (err as Error).message)
        }
    }
}

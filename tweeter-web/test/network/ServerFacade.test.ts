import { anything } from 'ts-mockito'
import { AuthToken, User } from 'tweeter-shared'
import { ServerFacade } from '../../src/network/ServerFacade'
import 'isomorphic-fetch'
describe('ServerFacade', () => {
    let serverFacade = new ServerFacade()
    let testUser = new User('first', 'last', 'alias', 'imgUrl')
    let testToken = new AuthToken('token', 0)
    it('Succeeds on registration', async () => {
        let response = await serverFacade.register({
            firstName: '',
            lastName: '',
            alias: '',
            password: '',
            imageStringBase64: '',
        })

        expect(response.success).toBe(true)
        //more tests can be written when we are not using fake data.
    })

    it('Succeeds on getting followers', async () => {
        let response = await serverFacade.getFollowers({
            user: testUser,
            pageSize: 0,
            lastItem: null,
            authToken: testToken,
        })

        expect(response.success).toBe(true)
    })

    it('Succeeds on getting follower counts', async () => {
        let response = await serverFacade.getFollowerCount('username', {
            user: testUser,
            authToken: testToken,
        })

        expect(response.success).toBe(true)
    })
})

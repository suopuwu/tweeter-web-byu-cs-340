import { anything } from 'ts-mockito'
import { StatusService } from './../../../tweeter-server/model/service/StatusService'
import { AuthToken, User } from 'tweeter-shared'
import 'isomorphic-fetch'
//npm test -- -t "StatusService"

describe('StatusService', () => {
    let statusService = new StatusService()
    let testUser = new User('first', 'last', 'alias', 'imgUrl')
    let testToken = new AuthToken('token', 0)

    it('Succeeds on getting follower counts', async () => {
        let [statuses, hasMore] = await statusService.loadMoreStory(testToken, testUser, 10, null)
        expect(statuses.length).toBe(10)
        for (let status of statuses) {
            expect(status.post).not.toBeNull()
        }
    })
})

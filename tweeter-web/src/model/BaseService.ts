import { ServerFacade } from '../network/ServerFacade'

export abstract class BaseService {
    serverFacade = new ServerFacade()
}

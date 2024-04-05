import { ServerFacade } from '../network/ServerFacade'

export abstract class BaseService {
    get serverFacade(): ServerFacade {
        return new ServerFacade()
    }
}

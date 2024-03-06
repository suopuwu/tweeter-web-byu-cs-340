import { StatusListPresenter } from './StatusListPresenter'

export class StoryPresenter extends StatusListPresenter {
    get loadFunction() {
        return this.service.loadMoreStory
    }
    loadOperationName = 'load story'
}

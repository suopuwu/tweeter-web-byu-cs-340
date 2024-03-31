import { AuthToken, Status, User } from 'tweeter-shared'
import { StatusService } from '../model/StatusService'
import { BasePresenter, BaseView, MessageView } from './BasePresenter'

export interface PostStatusView extends MessageView {
    post: string
    setPost: React.Dispatch<React.SetStateAction<string>>
}

export class PostStatusPresenter extends BasePresenter<PostStatusView> {
    private _service
    constructor(view: PostStatusView) {
        super(view)
        this._service = new StatusService()
    }

    get service() {
        return this._service
    }

    async submitPost(event: React.MouseEvent, authToken: AuthToken | null, currentUser: User | null) {
        event.preventDefault()

        this.tryWithReporting('post the status', async () => {
            this.view.displayInfoMessage('Posting status...', 0)

            let status = new Status(this.view.post, currentUser!, Date.now())

            await this.service.postStatus(authToken!, status)

            this.view.clearLastInfoMessage()
            this.view.setPost('')
            this.view.displayInfoMessage('Status posted!', 2000)
        })
    }

    clearPost(event: React.MouseEvent) {
        event.preventDefault()
        this.view.setPost('')
    }

    checkButtonStatus(post: string, authToken: AuthToken | null, currentUser: User | null) {
        return !post.trim() || !authToken || !currentUser
    }
}

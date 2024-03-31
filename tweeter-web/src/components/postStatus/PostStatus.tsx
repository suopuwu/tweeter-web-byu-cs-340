import './PostStatus.css'
import { useState } from 'react'
import { AuthToken, Status } from 'tweeter-shared'
import useToastListener from '../toaster/ToastListenerHook'
import useUserInfo from '../userInfo/UserInfoHook'
import { PostStatusPresenter, PostStatusView } from '../../presenter/PostStatusPresenter'

interface Props {
    presenter?: PostStatusPresenter
}

const PostStatus = (props: Props) => {
    const { displayErrorMessage, displayInfoMessage, clearLastInfoMessage } = useToastListener()

    const { currentUser, authToken } = useUserInfo()
    const [post, setPost] = useState('')
    const view: PostStatusView = {
        post: post,
        setPost: setPost,
        displayErrorMessage: displayErrorMessage,
        displayInfoMessage: displayInfoMessage,
        clearLastInfoMessage: clearLastInfoMessage,
    }
    const presenter = props.presenter ?? new PostStatusPresenter(view)

    return (
        <form>
            <div className="form-group mb-3">
                <textarea
                    className="form-control"
                    id="postStatusTextArea"
                    rows={10}
                    placeholder="What's on your mind?"
                    value={post}
                    onChange={(event) => {
                        setPost(event.target.value)
                    }}
                />
            </div>
            <div className="form-group">
                <button
                    id="postStatusButton"
                    className="btn btn-md btn-primary me-1"
                    type="button"
                    disabled={presenter.checkButtonStatus(post, authToken, currentUser)}
                    onClick={(event) => presenter.submitPost(event, authToken, currentUser)}
                >
                    Post Status
                </button>
                <button
                    id="clearStatusButton"
                    className="btn btn-md btn-secondary"
                    type="button"
                    disabled={presenter.checkButtonStatus(post, authToken, currentUser)}
                    onClick={(event) => presenter.clearPost(event)}
                >
                    Clear
                </button>
            </div>
        </form>
    )
}

export default PostStatus

import './UserInfo.css'
import { useContext } from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useToastListener from '../toaster/ToastListenerHook'
import useUserInfo from './UserInfoHook'
import { UserInfoPresenter, UserInfoView } from '../../presenter/UserInfoPresenter'

const UserInfo = () => {
    const { displayErrorMessage, displayInfoMessage, clearLastInfoMessage } = useToastListener()
    const { currentUser, authToken, displayedUser, setDisplayedUser } = useUserInfo()
    const [isFollower, setIsFollower] = useState(false)
    const [followeesCount, setFolloweesCount] = useState(-1)
    const [followersCount, setFollowersCount] = useState(-1)
    const view: UserInfoView = {
        displayErrorMessage,
        displayInfoMessage,
        clearLastInfoMessage,
        currentUser,
        authToken,
        displayedUser,
        setDisplayedUser,
        isFollower,
        setIsFollower,
        followeesCount,
        setFolloweesCount,
        followersCount,
        setFollowersCount,
    }

    const presenter = new UserInfoPresenter(view)
    if (!displayedUser) {
        setDisplayedUser(currentUser!)
    }

    useEffect(() => {
        // this seems to make it buggy and rerender a random number of times? and it also seems to be in the starter code?
        // presenter.setIsFollowerStatus(authToken!, currentUser!, displayedUser!)
        presenter.setNumbFollowees(authToken!, displayedUser!)
        presenter.setNumbFollowers(authToken!, displayedUser!)
    })

    const switchToLoggedInUser = (event: React.MouseEvent) => {
        event.preventDefault()
        setDisplayedUser(currentUser!)
    }

    return (
        <>
            {currentUser === null || displayedUser === null || authToken === null ? (
                <></>
            ) : (
                <div className="container">
                    <div className="row">
                        <div className="col-auto p-3">
                            <img src={displayedUser.imageUrl} className="img-fluid" width="100" alt="Posting user" />
                        </div>
                        <div className="col p-3">
                            {displayedUser !== currentUser && (
                                <p id="returnToLoggedInUser">
                                    Return to{' '}
                                    <Link to={''} onClick={(event) => switchToLoggedInUser(event)}>
                                        logged in user
                                    </Link>
                                </p>
                            )}
                            <h2>
                                <b>{displayedUser.name}</b>
                            </h2>
                            <h3>{displayedUser.alias}</h3>
                            <br />
                            {followeesCount > -1 && followersCount > -1 && (
                                <div>
                                    Following: {followeesCount} Followers: {followersCount}
                                </div>
                            )}
                        </div>
                        <form>
                            {displayedUser !== currentUser && (
                                <div className="form-group">
                                    {isFollower ? (
                                        <button
                                            id="unFollowButton"
                                            className="btn btn-md btn-secondary me-1"
                                            type="submit"
                                            onClick={(event) => presenter.unfollowDisplayedUser(event)}
                                        >
                                            Unfollow
                                        </button>
                                    ) : (
                                        <button
                                            id="followButton"
                                            className="btn btn-md btn-primary me-1"
                                            type="submit"
                                            onClick={(event) => presenter.followDisplayedUser(event)}
                                        >
                                            Follow
                                        </button>
                                    )}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default UserInfo

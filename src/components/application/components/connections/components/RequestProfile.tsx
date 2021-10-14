import React from 'react'

function RequestProfile(props: any) {
    return (
        <div className="my-requests-profile">
            <div className="my-requests-profile-img">
                <img src={props.user.avatar} />
            </div>
            <div className="my-requests-profile-data">
                <span className="my-requests-profile-name">
                    {props.user.name}
                </span>
                <span className="my-requests-profile-designation">
                    {props.user.designation}
                </span>
                <span className="my-requests-profile-time">
                    Connected 10 min ago
                </span>
            </div>
            <div className="my-requests-profile-btn-container">
                <button
                    className="my-requests-profile-accept-btn"
                    onClick={() => props.acceptConnectRequest(props.user.id)}
                >
                    Accept
                </button>
                <button
                    className="my-requests-profile-reject-btn"
                    onClick={() => props.rejectConnectRequest(props.user.id)}
                >
                    Remove
                </button>
            </div>
        </div>
    )
}

export default RequestProfile

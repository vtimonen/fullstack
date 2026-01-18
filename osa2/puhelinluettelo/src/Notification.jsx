const Notification = ({ message }) => {

    if (!message) {
        return null
    }


    const className = message.type === 'error' ? 'notif error' : 'notif success'

    return (
        <div className={className}>
            {message.message}
        </div>
    )
}

export default Notification
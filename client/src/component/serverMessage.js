import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from '@material-ui/lab';

const Message = () => {
    const Message = useSelector(state => state.status.message);
    return(
        <>
            {Message.mess !== null && <Alert severity={Message.type}>{Message.mess}</Alert>}
        </>
    )
}

export default Message;
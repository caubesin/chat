import axios from 'axios';

const sendReq = (configReq) => {
    return new Promise((resolve, reject) => {
        const config = {
            method: configReq.method,
            url: `${process.env.SERVER_URL}${configReq.url}`,
            headers: {
                'Content-Type': configReq.header
            },
            withCredentials: true,
            data: configReq.data
        }
        axios(config)
            .then((res) => resolve(res))
            .catch(err => reject(err))
    })
}

export default sendReq;
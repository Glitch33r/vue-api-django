import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: 'https://api-with-bot.herokuapp.com/api/sn/'
    })
}


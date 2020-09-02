const request = require('request')
const crypto = require('crypto')

const apiKey = '48GphC_MTWN_0ntW4V1osU4S'
const apiSecret = '-hoVHM9kC1JRwlQBPjYdzosCCpKl7CNtomzyCTGVoLcQ5PSV'

module.exports = function (method, url, data = {}) {
    const path = `/api/v1${url}`
    const expires = Math.round(new Date().getTime() / 1000) + 60 // 1 min in the future
    const postBody = JSON.stringify(data)

    const signature = crypto.createHmac('sha256', apiSecret)
        .update(method + path + expires + postBody)
        .digest('hex')

    const headers = {
        'content-type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'api-expires': expires,
        'api-key': apiKey,
        'api-signature': signature
    }

    return new Promise((resolve, reject) => {
        const requestOptions = {
            headers: headers,
            url: 'https://testnet.bitmex.com' + path,
            method,
            body: postBody
        }

        request(requestOptions, (error, response, body) => {
            if (error) return reject(error)
            resolve(response, body)
        })
    })
}

export const get = (url: string) => {
    return new Promise((resolve, reject) => {
        fetch(url).then(res => {
            return res.json()
        }).then(data => {
            return resolve(data)
        }).catch(err => {
            return reject(err)
        })
    })
}

export const API = {
    getAllStation: () => {
        return get(`/ticket/api/get_all_station`)
    }
}
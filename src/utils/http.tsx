const headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
})

export const get = (url: string) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'GET',
            headers,
        }).then(res => {
            return res.json()
        }).then(data => {
            return resolve(data)
        }).catch(err => {
            return reject(err)
        })
    })
}

export const post = (url: string, params: any) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method:'POST',
            headers,
            body: JSON.stringify(params)
        }).then(res => {
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
    },
    getTrainList: (params: any) => {
        return post(`/ticket/api/get_train_list`, params)
    }
}
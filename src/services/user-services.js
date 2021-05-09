import Axios from 'axios';

class UserService {
    static getAllUsers() {
        return new Promise(async (resolve, reject) => {
            try {
                const data = Axios.get('http://localhost:5005/user/all')
                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    };

    static createUser(userData) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = Axios.post('http://localhost:5005/user/create', {...userData})
                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    }

    static editUser(userId, newUserData) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = Axios.put('http://localhost:5005/user/edit/' + userId, {...newUserData})
                resolve(data)
            } catch (error) {
                reject (error)
            }
        })
    }

    static deleteUser(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = Axios.delete('http://localhost:5005/user/delete/' + userId)
                resolve(data)
            } catch (error) {
                reject (error)
            }
        })
    }
}

export default UserService;
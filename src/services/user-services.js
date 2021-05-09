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
}

export default UserService;
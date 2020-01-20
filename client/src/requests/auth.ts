const URL = 'http://192.168.1.100:3000/auth';

export type Reqister = {
    login: string;
    email: string;
    password: string;
    confirmPassword: string;
};
export const registerRequest = async (register: Reqister) => {
    return fetch(`${URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(register)
    });
};

export type Login = {
    login: string;
    password: string;
};

export const loginRequest = async (login: Login) => {
    return fetch(`${URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
    });
};

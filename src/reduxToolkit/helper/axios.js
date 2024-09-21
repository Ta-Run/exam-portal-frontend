import axios from "axios";
import { API_URL } from './../../config/index';

// *************************** Admin ***************************

export const authAdminHeader = () => {
    const token = localStorage.getItem("persist:admin");
    const parsedData = JSON.parse(token);
    const userToken = parsedData && parsedData.admin ? JSON.parse(parsedData.admin)?.authentication?.accessToken : null;

    return {
        headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }
}

export const authAdminHeaderImage = () => {
    const token = localStorage.getItem("persist:admin");
    const parsedData = JSON.parse(token);
    const userToken = parsedData && parsedData.admin ? JSON.parse(parsedData.admin)?.authentication?.accessToken : null;

    return {
        headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
        }
    }
}

// *************************** Client ***************************

export const authClientHeader = () => {
    const token = localStorage.getItem("persist:client");
    const parsedData = JSON.parse(token);
    const userToken = parsedData && parsedData.client ? JSON.parse(parsedData.client)?.authentication?.accessToken : null;

    return {
        headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }
}

export const authClientHeaderImage = () => {
    const token = localStorage.getItem("persist:client");
    const parsedData = JSON.parse(token);
    const userToken = parsedData && parsedData.client ? JSON.parse(parsedData.client)?.authentication?.accessToken : null;

    return {
        headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
        }
    }
}

// *************************** Spoc Person ***************************

export const authSpocPersonHeader = () => {
    const token = localStorage.getItem("persist:spocPerson");
    const parsedData = JSON.parse(token);
    const userToken = parsedData && parsedData.spocPerson ? JSON.parse(parsedData.spocPerson)?.authentication?.accessToken : null;

    return {
        headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }
}

export const authSpocPersonHeaderImage = () => {
    const token = localStorage.getItem("persist:spocPerson");
    const parsedData = JSON.parse(token);
    const userToken = parsedData && parsedData.spocPerson ? JSON.parse(parsedData.spocPerson)?.authentication?.accessToken : null;

    return {
        headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
        }
    }
}

// *************************** Child User ***************************

export const authChildUserHeader = () => {
    const token = localStorage.getItem("persist:childUser");
    const parsedData = JSON.parse(token);
    const userToken = parsedData && parsedData.childUser ? JSON.parse(parsedData.childUser)?.authentication?.accessToken : null;

    return {
        headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }
}

export const authChildUserHeaderImage = () => {
    const token = localStorage.getItem("persist:childUser");
    const parsedData = JSON.parse(token);
    const userToken = parsedData && parsedData.childUser ? JSON.parse(parsedData.childUser)?.authentication?.accessToken : null;

    return {
        headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
        }
    }
}

// *************************** Common Header ***************************

export const authCommonHeader = () => {
    const pathName = window.location.pathname;

    if (pathName.includes("client")) {
        const token = localStorage.getItem("persist:client");
        const parsedData = JSON.parse(token);
        const userToken = parsedData && parsedData.client ? JSON.parse(parsedData.client)?.authentication?.accessToken : null;

        return {
            headers: {
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
    } else if (pathName.includes("spoc-person")) {
        const token = localStorage.getItem("persist:spocPerson");
        const parsedData = JSON.parse(token);
        const userToken = parsedData && parsedData.spocPerson ? JSON.parse(parsedData.spocPerson)?.authentication?.accessToken : null;

        return {
            headers: {
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
    } else if (pathName.includes("child-user")) {
        const token = localStorage.getItem("persist:childUser");
        const parsedData = JSON.parse(token);
        const userToken = parsedData && parsedData.childUser ? JSON.parse(parsedData.childUser)?.authentication?.accessToken : null;

        return {
            headers: {
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
    }
}

export const authCommonHeaderImage = () => {

    const pathName = window.location.pathname;

    if (pathName.includes("client")) {
        const token = localStorage.getItem("persist:client");
        const parsedData = JSON.parse(token);
        const userToken = parsedData && parsedData.client ? JSON.parse(parsedData.client)?.authentication?.accessToken : null;

        return {
            headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "multipart/form-data",
            }
        }
    } else if (pathName.includes("spoc-person")) {
        const token = localStorage.getItem("persist:spocPerson");
        const parsedData = JSON.parse(token);
        const userToken = parsedData && parsedData.spocPerson ? JSON.parse(parsedData.spocPerson)?.authentication?.accessToken : null;

        return {
            headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "multipart/form-data",
            }
        }
    } else if (pathName.includes("child-user")) {
        const token = localStorage.getItem("persist:childUser");
        const parsedData = JSON.parse(token);
        const userToken = parsedData && parsedData.childUser ? JSON.parse(parsedData.childUser)?.authentication?.accessToken : null;

        return {
            headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "multipart/form-data",
            }
        }
    }
}

const Axios = axios.create({
    baseURL: API_URL
})

export default Axios;
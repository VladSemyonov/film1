import axios from "axios"

export default {
    films: {
        fetchAll: () => axios.get("/api/authFilms").then(res => res.data.films),
        create: film => axios.post("/api/authFilms", {film}).then(res => res.data.film),
        update: film => axios.put(`/api/authFilms/${film._id}`, {film}).then(res => res.data.film),
        delete: film => axios.delete(`/api/authFilms/${film._id}`),
        fetchById: id => axios.get(`/api/authFilms/${id}`).then(res => res.data.film),
    },
    users: {
        create: user => axios.post('/api/users/', {user}),
        login: credentials => axios.post('/api/auth', {credentials}).then(result => result.data.token),
    }
}

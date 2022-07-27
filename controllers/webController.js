const webControllers = {
    inicio: (req, res) => {
        res.sendFile('index.html', { root: './public/views' })
    },
    login: (req, res) => {
        res.sendFile('login.html', { root: './public/views' })
    },
    logout: (req, res) => {
        res.sendFile('logout.html', { root: './public/views' })
    },
    register: (req, res) => {
        res.sendFile('register.html', { root: './public/views' })
    },
    error: (req, res) => {
        res.sendFile('error.html', { root: './public/views' })
    }
}

export default webControllers;
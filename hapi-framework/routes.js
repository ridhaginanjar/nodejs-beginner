const routes = [
    {
        method:"GET",
        path: "/",
        handler: (request, h) => {
            return 'Homepage';
        },
    },
    {
        method:"*",
        path: "/",
        handler: (request, h) => {
            return 'Method Not Found';
        },
    },
    {
        method:"GET",
        path:"/about",
        handler: (request, h) => {
            return 'About';
        },

    },
    {
        method:"*",
        path:"/about",
        handler: (request, h) => {
            return 'Method Not Found';
        }
    },
    {
        method:"GET",
        path:"/hello/{name?}",
        handler: (request, h) => {
            const {name = 'Default name'} = request.params;
            const {lang} = request.query;

            if(lang === 'id') {
                return `Hai, ${name} are you drom indonesia ?`;
            }
            return `Hai, ${name}`;
        }
    },
    {
        method: 'POST',
        path: '/login',
        handler: (request, h) => {
            const { username, password } = request.payload;
            return `Welcome ${username}!`;
        },
    },
    {
        method:"*",
        path:"/{any*}",
        handler: (request, h) => {
            return "Method and Path is Not Found";
        }
    }

]

module.exports = routes;
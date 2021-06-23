const http = require('http');


const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write(`
            <html>
                <body>
                    <h1>Hello<h2>
                    <form action="/create-user" method="POST">
                        <input type="text" name="userName" />
                        <button type="submit">Send</button>
                    </form>
                </body>
            </html>
        `)
    }
    if (req.url === '/users') {
        res.write(`
            <html>
                <body>
                    <ul>
                        <li>User 1</li>
                        <li>User 2</li>
                        <li>User 3</li>
                    </ul>
                </body>
            </html>
        `)
    }
    if (req.url === '/create-user') {
        const body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(message);
            res.end();
        });
    }
    res.end();
});

server.listen(3000);

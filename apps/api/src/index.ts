import { Elysia } from 'elysia';
const app = new Elysia()
    .get('/',()=>{
        return 'hello from server'
    })
    .listen(3000)

console.log(
    `🦊 Elysia API is running at http://${app.server?.hostname}:${app.server?.port}`
)
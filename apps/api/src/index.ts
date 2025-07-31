import { Elysia } from 'elysia';
import { prisma } from 'db'
const app = new Elysia()
    .get('/',()=>{
        return 'hello from server'
    })
    .get('/users' , async () => {
        const allUsers = await prisma.user.findMany()
        console.log(`users ${allUsers}`)
        return allUsers
    })
    .listen(3000)

console.log(
    `🦊 Elysia API is running at http://${app.server?.hostname}:${app.server?.port}`
)
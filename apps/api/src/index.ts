import { Elysia } from 'elysia';
import { PrismaClient } from '@prisma/client'
import { cors } from '@elysiajs/cors'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

const app = new Elysia()
    .use(cors())
    .get('/',()=>{
        return 'hello from server'
    })
    .get('/users', async () => {
        const users = await prisma.user.findMany()
        return {
            success: true,
            message: 'Users fetched successfully',
            users
        }
    })
    .post('/login', async (req) => {
        const body = await req.request.json()
        const { phone } = body as { phone: string }  
        if (!phone) {
          return {
            success: false,
            message: 'Phone number is required',
          }
        }      
        const otp = Math.floor(1000 + Math.random() * 9000).toString()

        const existingUser = await prisma.user.findUnique({
          where: { phone: phone }
        })
      
        if (existingUser) {
          await prisma.user.update({
            where: { phone },
            data: {
              otpCode: otp,
              updatedAt: new Date()
            }
          })
        } else {
          await prisma.user.create({
            data: {
              phone,
              otpCode: otp,
              otpCreatedAt: new Date()
            }
          })
        }
        return {
          success: true,
          message: 'OTP sent',
          otp 
        }
      })
      .post('/verfiy', async (req) => {
        const body = await req.request.json()
        const { otp, phone } = body as {otp: string, phone: string}
        
        const userData = await prisma.user.findUnique({
          where:{phone}
        })

        const otpTarget = userData?.otpCode
        const secret = process.env.SECRET
        if(!secret){
          throw new Error('JWT SECRET is not defined in evironemnt variables')
        }
        
        if(otpTarget == otp){
          const token = jwt.sign({userID:userData?.id}, secret,{
            expiresIn: '7d'
          })
          return {
            success : true,
            message: 'verified code',
            token: token
          }
        }else{
          return {
            success: false,
            message: 'invalid code'
          }
        }
      })
      
    .listen(3000)

console.log(
    `🦊 Elysia API is running at http://${app.server?.hostname}:${app.server?.port}`
)
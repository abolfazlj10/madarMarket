import { Elysia } from 'elysia';
import { prisma } from 'db'
import { cors } from '@elysiajs/cors'

const app = new Elysia()
    .use(cors())
    .get('/',()=>{
        return 'hello from server'
    })
    .post('/login', async (req) => {
      console.log('he came here.')
        const body = await req.request.json()
        const { phone } = body

        console.log(phone)
      
        if (!phone) {
          return {
            success: false,
            message: 'Phone number is required',
          }
        }
      
        const otp = Math.floor(1000 + Math.random() * 9000).toString()

        console.log(otp)
      
        // چک می‌کنیم آیا کاربر با این شماره وجود داره یا نه
        const existingUser = await prisma.user.findUnique({
          where: { phone }
        })

        await prisma.user.create({
          data: {
            phone,
            otpCode: otp,
            otpCreatedAt: new Date()
          }
        })
        
      
        // if (existingUser) {
        //   // بروزرسانی کد OTP برای کاربر موجود
        //   await prisma.user.update({
        //     where: { phone },
        //     data: {
        //       otpCode: otp,
        //       otpCreatedAt: new Date()
        //     }
        //   })
        // } else {
        //   // ایجاد کاربر جدید همراه با OTP
        //   await prisma.user.create({
        //     data: {
        //       phone,
        //       otpCode: otp,
        //       otpCreatedAt: new Date()
        //     }
        //   })
        // }
      
        return {
          success: true,
          message: 'OTP sent',
          otp 
        }
      })
      
    .listen(3000)

console.log(
    `🦊 Elysia API is running at http://${app.server?.hostname}:${app.server?.port}`
)
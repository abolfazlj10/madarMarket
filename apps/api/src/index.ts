import { Elysia } from 'elysia';
import { PrismaClient } from '@prisma/client'
import { cors } from '@elysiajs/cors'
import jwt from 'jsonwebtoken'
import serveStatic, { staticPlugin } from '@elysiajs/static'

const prisma = new PrismaClient()

const authenticate = async (req: Request) => {
  const authHeader = req.headers.get('authorization');
  const secret = process.env.SECRET;

  if (!secret) {
    throw new Error('JWT secret not set');
  }

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, secret) as { userID: number };
    return payload;
  } catch (err) {
    return null;
  }
};

const app = new Elysia()
    .use(cors())
    .use(staticPlugin({
      assets: 'public/categories', 
      prefix: '/categories'
    }))
    .use(staticPlugin({
      assets: 'public/products', 
      prefix: '/products'
    }))
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
    .get('/categories', async () => {
      const categories = await prisma.category.findMany()
      return {
        success: true,
        data: categories
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
    .get('/me' , async (req) => {
      const payload = await authenticate(req.request)
      if (!payload) {
        return {
          success: false,
          message: 'Unauthorized',
        };
      }

      const user = await prisma.user.findUnique({
        where: {
          id: payload.userID,
        },
      });

      if (!user) {
        return {
          success: false,
          message: 'User not found',
        };
      }
      return {
        success: true,
        message: 'User fetched',
        user,
      };

    })
    .get('/productEachCategory/:id', async (req)=>{
      const { id } = req.params
      const products = await prisma.product.findMany({
        where:{categoryId: Number(id)}
      })
      if(!products)
        return{
          success: false,
          message: 'a problem to find products'
      }
      return{
        success: true,
        message: 'products sent',
        data: products
      }
    })
    .get('/specialProducts', async () =>{
      const specialProducts = await prisma.product.findMany({
        where:{isSpecial:true}
      })
      return {
        success: true,
        message: 'specia products sent',
        data: specialProducts
      }
    })
    .get('/tagsByCategory/:id',async (req)=>{
      const { id } = req.params
      const tags  = await prisma.tag.findMany({
        where:{categoryId: Number(id)}
      })
      return{
        success: true,
        message: 'tags by category',
        data: tags
      }
    })
    .get('/searchProducts/:name', async (req) => {
        const { name } = req.params
        const filteredProducts = await prisma.product.findMany({
          where: {
            name: {
              contains: name,
              mode: 'insensitive',
            },
          },
          take: 5
        });
    
        return {
          success: true,
          message: 'Products filtered successfully',
          data: filteredProducts,
        };
    })
    .listen(3000)

console.log(
    `🦊 Elysia API is running at http://${app.server?.hostname}:${app.server?.port}`
)
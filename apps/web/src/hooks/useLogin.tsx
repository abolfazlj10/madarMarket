import { useMutation, useQuery } from '@tanstack/react-query';

export function useLogin() {
  return useMutation({
    mutationFn: async (phone: string) => {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      });

      if (!res.ok) {
        throw new Error('خطا در ارسال درخواست');
      }

      return res.json();
    },
  });
}

export function useVerify () {
  return useMutation({
    mutationFn: async ({phone,otp} : {phone: string, otp: string}) => {
      const res = await fetch('http://localhost:3000/verfiy' , {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({phone,otp})
      })
      if(!res.ok){
        throw new Error('خطا در ارسال درخواست');
      }

      return res.json()
    }
  })
}

export function isLoginUser () {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const token = localStorage.getItem('tokenMarket')
      if(!token) {
        return{
          success: false,
          message: 'unauthorized'
        }
      }
      const res = await fetch('http://localhost:3000/me',{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      if(!res.ok){
        localStorage.removeItem('tokenMarket')
        return{
          success: false,
          message: 'unauthorized'
        }
      }
      return res.json()
    },
    retry: false,
    refetchOnWindowFocus: false
  })
}
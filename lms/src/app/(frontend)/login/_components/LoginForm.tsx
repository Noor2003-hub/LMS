'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, ReactElement, useState } from 'react'
import SubmitButton from '../../_components/SubmitButton'
import { login, LoginResponse } from '../_actions/login'

export default function LoginForm(): ReactElement {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  async function handelSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsPending(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const result: LoginResponse = await login({ email, password })
    setIsPending(false)
    if (result.sucess) {
      router.push('/dashboard')
    } else {
      setError(result.error || 'an error accurred')
    }
  }
  return (
    <div className="flex gap-8 min-h-full flex-col justify-center items-center">
      <div className="text-3xl">Login</div>
      <div className="w-full mx-auto sm:max-w-sm">
        <form className="flex flex-col gap-4" onSubmit={handelSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input className="w-full textInput" id="email" name="email" type="email" />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input className="w-full textInput" id="password" name="password" type="password" />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <SubmitButton loading={isPending} text="Login" />
        </form>
        <p className="mt-10 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-500 font-bold">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  )
}

"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function RegisterPage(){
  const { push } = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const res = await fetch('/api/auth/register',{
      method: 'POST',
      body : JSON.stringify({
        fullname: e.target.fullname.value,
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    })
    if (res.status === 200) {
      e.target.reset();
      setIsLoading(false);
      push("/login");
    } else {
      setError("Email Already Exists");
      setIsLoading(false);
    }
  };

    return(
    <>

      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        {error !== '' && <div className=" font-bold mb-3 flex-col text-center text-red-600">{error}</div>}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label htmlFor="fullname" className="block text-sm/6 font-medium text-gray-900">
                Your fullname
              </label>
              <div className="mt-2">
                <input
                  id="fullname"
                  name="fullname"
                  type="fullname"
                  required
                  autoComplete="fullname"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                disabled={isLoading}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? "Loading..." : "Sign Up"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            You Have Account?{' '}
            <Link  href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
    )
}
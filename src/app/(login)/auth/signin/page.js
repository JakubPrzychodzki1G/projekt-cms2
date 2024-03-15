import Link from "next/link"
import Image from "next/image"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import LoginForm from "./components/LoginForm"

export const metadata = {
  title: "Logowanie | Panel Administracyjny",
  description: "Panel logowania do Panelu Administracyjnego Klubu Posejdon Konin"
}

const SignIn = () => {
  
  return (
    <>
      <Breadcrumb pageName="Logowanie" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link href="/main">
                <div className="mb-5.5 text-slate-700 inline-block text-3xl font-bold">
                  <p>Przejdź na strone główną</p>
                </div>

                <span className="mt-2 inline-block">
                  <Image
                    width={400}
                    height={400}
                    src={"/next.svg"}
                    alt="Logo"
                  />
                </span>
              </Link>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Zaloguj się do Panelu Administracyjnego
              </h2>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn

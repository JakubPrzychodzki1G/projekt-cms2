import "./globals.css"
import "./data-tables-css.css"
import "./satoshi.css"
import Loader from "@/components/common/Loader"
import AuthProvider from "@/components/simple/authProvider";
import Menus from "./components/RootLayout/Menus";
// import { AppState } from "@/components/simple/clientAuthProvider"

export default function RootLayout({ children }) {  
  const loading = false
  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 1000)
  // }, [])

  return (
    <html lang="pl">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? (
            <Loader />
          ) : (
            <AuthProvider>
              <div className="grid grid-cols-12">
                <Menus />
                <main className="col-span-full lg:col-start-4 xl:col-span-10 xl:col-start-3 row-span-11 row-start-2 min-h-screen">
                    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                        {children}
                    </div>
                </main>
              </div>
            </AuthProvider>
          )}
        </div>
      </body>
    </html>
  )
}

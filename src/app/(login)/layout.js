import "../(manageApp)/globals.css"
import "../(manageApp)/data-tables-css.css"
import "../(manageApp)/satoshi.css"

export const metadata = {
  title: 'Logowanie'
}

export default function RootLayout({ children }) {
 return (
  <html lang="pl">
    <body suppressHydrationWarning={true}>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <div className="flex justify-center items-center min-h-screen">
          <main className="h-full">
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </body>
  </html>
  )
}

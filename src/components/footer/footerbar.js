'use client';
import NoBorderButton from "../simple/noborderbutton"

export default function FooterBar() {
    return (
      <div className="bg-gray-900 h-fit xl:h-[30vh] w-full flex justify-center">
        <div className="w-5/6 min-[1600px]:w-9/12 mt-8 mb-8">
          <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-4 xl:gap-24">
              <div className="col-span-2 md:col-span-1 text-white">
                  <a href="#" className="flex mb-5">
                      <img src="/next.svg" className="h-8 mr-3" alt="Poseidon Logo"/>
                      <span className="self-center text-2xl font-semibold whitespace-nowrap">Posejdon</span>
                  </a>
                  <p className="max-w-lg mb-3">Strona klubu pływackiego Posejdon Konin</p>
                  <p className="max-w-lg">Licencja</p>
              </div>
              <div className="col-span-2 md:col-span-1">
                  <h3 className="mb-6 text-sm font-semibold text-gray-400 uppercase dark:text-white">Kontakt</h3>
                  <ul>
                    <NoBorderButton>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                      </svg>
                      Konin, ul. 11 listopada, 23/103
                    </NoBorderButton>
                    <NoBorderButton>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                      klubposejdonkonin@gmail.com
                    </NoBorderButton>
                    <NoBorderButton>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                      +48 695 657 252
                    </NoBorderButton>
                  </ul>
              </div>
              <div className="col-span-2 md:col-span-1">
                  <h3 className="mb-6 text-sm font-semibold text-gray-400 uppercase dark:text-white">Śledź nas</h3>
                  <ul>
                    <NoBorderButton href="https://facebook.com">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16"> 
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/> 
                      </svg>
                      <span className="tracking-tighter text-base">
                        Facebook
                      </span>
                    </NoBorderButton>
                  </ul>
              </div>
              <div className="col-span-2 md:col-span-1">
                  <h3 className="mb-6 text-sm font-semibold text-gray-400 uppercase dark:text-white">Polityka</h3>
                  <ul>
                    <NoBorderButton href="privacy-politics">
                      Polityka Prywatności
                    </NoBorderButton>
                  </ul>
              </div>
          </div>
        </div>
      </div>
    )
  }
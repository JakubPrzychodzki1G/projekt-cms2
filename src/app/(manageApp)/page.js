import ECommerce from "@/components/Dashboard/E-commerce";
import Validator from "./components/Auth/Validator";

export const metadata = {
  title: "Panel administracyjny | Klubu Posejdon Konin",
  description: "This is Home Blog page for TailAdmin Next.js"
}

export default function Home() {

  return (
    <Validator>
      <ECommerce />
    </Validator>
  )
}

import LessonTable from "@/components/Tables/LessonTable"

export const metadata = {
  title: "Tables Page | Next.js E-commerce Dashboard Template",
  description: "This is Tables page for TailAdmin Next.js"
  // other metadata
}

const LessonPage = () => {
  return (
    <>
      <LessonTable isMainPage={true}/>
    </>
  )
}

export default LessonPage

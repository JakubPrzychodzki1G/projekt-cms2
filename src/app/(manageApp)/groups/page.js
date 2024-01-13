import GroupsTable from "@/components/Tables/GroupsTable"

export const metadata = {
  title: "Tables Page | Next.js E-commerce Dashboard Template",
  description: "This is Tables page for TailAdmin Next.js"
  // other metadata
}

const GroupsPage = () => {
  return (
    <>
      <GroupsTable isMainPage={true}/>
    </>
  )
}

export default GroupsPage

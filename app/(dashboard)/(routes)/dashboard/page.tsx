import { UserButton } from "@clerk/nextjs"

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-7xl p-6 sm:px-4">
      <h1 className="text-7xl font-black">Dashboard (Protected)</h1>
      <UserButton afterSignOutUrl="/"/>
    </main>
  )
}

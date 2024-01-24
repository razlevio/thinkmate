"use client"


import { Separator } from "@/components/ui/separator"
import { Sidebar } from "@/components/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
export function AppShell({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

	return (
		<div className="flex h-full">
      {isLoading && <AppShell.Skeleton />}
      {!isLoading && (
        <>
          <Sidebar isCollapsed={false} />
          <div className="w-full">
            <Navbar />
            <main>{children}</main>
          </div>
        </>
      )}
		</div>
	)
}

AppShell.Skeleton = function AppShellSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4 py-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-48" />
      </div>
      <Separator />
      <div className="flex flex-col gap-4 py-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-48" />
      </div>
      <Separator />
      <div className="flex flex-col gap-4 py-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-48" />
      </div>
    </div>
  )
}

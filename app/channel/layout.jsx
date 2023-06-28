"use client"
import { useContext, useEffect } from "react"
import MainLayout from "@/layout/mainLayout";
import MainSidebarLayout from "@/layout/mainSidebarLayout";
import Context from "@/GlobalVariableProvider/Context"

export default function ChannelLayout({ children }) {
  const context = useContext(Context)
  useEffect(() => {
    if (context.deviceType == 0) {
      context.setCollapseSidebar(false)
    } else {
      context.setCollapseSidebar(true)
    }
  }, [])

  return (
    <MainLayout>
      <MainSidebarLayout>{children}</MainSidebarLayout>
    </MainLayout>
  );
}

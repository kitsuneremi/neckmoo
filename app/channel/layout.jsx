"use client"
import MainLayout from "../../layout/mainLayout";
import MainSidebarLayout from "@/layout/mainSidebarLayout";
import Context from "@/GlobalVariableProvider/Context"
import { useContext, useEffect } from "react"
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

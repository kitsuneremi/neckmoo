import MainLayout from "@/layout/mainLayout";
import MainSidebarLayout from "@/layout/mainSidebarLayout";
export default function AdminLayout({ children }) {

  return (
    <MainLayout>
      <MainSidebarLayout>{children}</MainSidebarLayout>
    </MainLayout>
  );
}

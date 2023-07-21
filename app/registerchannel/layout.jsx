"use client";
import MainLayout from "@/layout/mainLayout";
import ExpandeCollapseLayout from '@/layout/expandCollapseOnly';
import { useDispatch } from 'react-redux'
import { close, reverse, open } from '@/redux/features/sidebar-slice';
export default function ChannelLayout({ children }) {
  const dispatch = useDispatch();
  dispatch(open())

  return (
    <MainLayout>
      <ExpandeCollapseLayout>
        {children}
      </ExpandeCollapseLayout>
    </MainLayout>
  );
}

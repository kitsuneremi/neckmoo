import { getServerSession } from "next-auth/next";
import { useLayoutEffect } from "react";

// Component giao diện
export default function MyComponent() {
  useLayoutEffect(() => {
    const authen = async () => {
        const session = await getServerSession();
        if(!!session){
            console.log('???')
        }
    };
    authen()
    
  }, []);
  // Sử dụng isAuthenticated để điều chỉnh giao diện
  return (
    <></>
  );
}

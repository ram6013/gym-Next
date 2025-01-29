import { useRouter } from "next/navigation";
export default function LogOut({setShowLogOut}: {setShowLogOut: React.Dispatch<React.SetStateAction<boolean>>}) {
    const Router = useRouter();
    const clearCoockies = () => {
        const cookies = document.cookie.split(";");

        cookies.forEach(cookie => {
          const cookieName = cookie.split("=")[0];
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
          setShowLogOut(false);
          Router.push("/")
        });
    }

    return (
        <div className="absolute  left-12 lg:left-24 lg:top-5 top-14 justify-center gap-7">
            <button onClick={clearCoockies} className="text-orange font-extrabold border-2 bg-negro border-orange p-1 lg:p-2 transition-transform hover:scale-110">LogOut</button>
        </div>
    );
}
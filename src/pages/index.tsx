import { useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();
  console.log(data);
  return (
    <div className="flex items-center justify-center">
      {data?.user?.email ?? "no"}
    </div>
  );
}

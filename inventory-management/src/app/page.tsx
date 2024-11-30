import Image from "next/image";
import NavBar from "./(components)/NavBar";
import DashBoard from "./(components)/DashBoard";

export default function Home() {
  return (
    <div>
      <NavBar />
      <DashBoard />
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import SearchInput from "./searchInput";
import {UserButton,OrganizationSwitcher}from "@clerk/nextjs"
export const Navbar = ()=>{
    return <nav className="flex items-center justify-between h-full w-full  ">
        <section className="flex gap-3 shrink-0 items-center pr-6 pt-6">
            <Link href={"/"}>
            <Image src={"/logo.svg"} alt="logo" width={36} height={36} />
            <h3 className="text-xl">Documentary</h3>
            </Link>
        </section>
        <SearchInput/>
        <div className="flex gap-3 items-center pl-6  flex-wrap">
            <OrganizationSwitcher 
            afterCreateOrganizationUrl={"/"} 
            afterLeaveOrganizationUrl="/" 
            afterSelectOrganizationUrl={"/"}
            afterSelectPersonalUrl={"/"}/>
            <UserButton/>
        </div>

    </nav>
}
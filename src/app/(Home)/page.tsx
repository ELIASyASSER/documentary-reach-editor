"use client"
import { usePaginatedQuery } from "convex/react"
import { Navbar } from "./navbar"
import { TemplatesGallery } from "./template-gallery"
import { api } from "../../../convex/_generated/api"
import { DocumentTable } from "./documentsTable"
import {  useSearchParams } from "next/navigation"
const Home = () => {
  const params = useSearchParams()
  const {results,
    status,
  loadMore} = usePaginatedQuery(api.documents.getDocuments,{search:params.toString()},{initialNumItems:5})

  return (
    <main className="min-h-screen flex flex-col ">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4 ">
        <Navbar/>
      </div>
      <section className="mt-20">
        <TemplatesGallery/>
        <DocumentTable documents={results} loadMore={loadMore} status={status}/>
      </section>
    </main>
  )
}

export default Home
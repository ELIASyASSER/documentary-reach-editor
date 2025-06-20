//this from convex database =>schema
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    documents:defineTable({
        title:v.string(),
        initialContent:v.optional(v.string()),
        ownerId:v.string(),
        roomId:v.optional(v.string()),//for collabortaion
        organizationId:v.optional(v.string()),//for collaboration and permessions

    })
    .index("by_owner_id",["ownerId"])
    .index("by_organization_id",["organizationId"])
    .searchIndex("search_title",{
        searchField:"title",
        filterFields:["ownerId","organizationId"]//not to search on the whole db only on the owenerId or organization id
    })
    ,//database indexing    
})
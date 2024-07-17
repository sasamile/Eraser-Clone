import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


{
  /**Buscar los files de los teams */
}
export const getFiles = query({
  args: {
    teamId: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("files")
      .filter((q) => q.eq(q.field("teamId"), args.teamId))
      .order("desc")
      .collect();
    return result;
  },
});

{
  /** Crear los files de los teams */
}

export const createFiles = mutation({
  args: {
    teamId: v.string(),
    fileName: v.string(),
    createBy: v.string(),
    archive: v.boolean(),
    document: v.string(),
    whiteboard: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .insert("files", args)
      .catch((err) => console.log(err));

    return result;
  },
});

export const updateDocument = mutation({
  args: {
    _id: v.id("files"),
    document: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args._id, { document: args.document });
    return result;
  },
});

export const updatewhiteboard = mutation({
  args: {
    _id: v.id("files"),
    whiteboard: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args._id, { whiteboard: args.whiteboard });
    return result;
  },
});

export const getFileById = query({
  args: {
    _id: v.id("files"),
  },
  handler: async (ctx, args) => {
    const result =await ctx.db.get(args._id)
      
    return result;
  },
});

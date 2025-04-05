import { mutation,query } from "./_generated/server"
import { v } from "convex/values"


export const CreateNewRoom=mutation({
    args: {
        coachingOption:v.string(),
        topic:v.string(),
        expertName:v.string(),
        
    },
    handler:async(ctx,args) => {
        const data = {
            coachingOption:args.coachingOption,
            topic:args.topic,
            expertName:args.expertName
        }
        const result=await ctx.db.insert('DiscussionRoom',data)
        return result
    }
})

export const GetDiscussionRoom=query({
    args: {
        id:v.id('DiscussionRoom')
    },

    handler:async (ctx, args) => {
        const result =  await ctx.db.get(args.id);
        return result

    }
})
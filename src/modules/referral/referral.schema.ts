
import z from "zod";

export const basic = z.object({
    body:z.object({}),
    query:z.object({}),
    params:z.object({})
})

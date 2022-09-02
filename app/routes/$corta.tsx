import type { LoaderArgs } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import { db } from "~/utils/db.server";


export async function loader({ request, params }: LoaderArgs){
    const { corta } = params;
    let protocol = "http://";

    const link = await db.link.findFirst({
        where: {
            short: corta,
        }
    });

    if(!link) {
        return json({
            error: "Link not found",
        });
    }

    
    return redirect(`${protocol}${link.original}`, { 
        status: 301, 
        headers: {
            "Cache-Control": "public, max-age=1296000", // In cache during 15 days in seconds
        }
    } );
}


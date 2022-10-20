import { Socket } from "socket.io";
import { InvestigatorFirestore } from "../../data/firestore/Users/InvestigatorsFirestore.js";
import { io } from "../../index.js";

export async function getInvestigatorCollection(userId: string) {
    const investigatorDB = new InvestigatorFirestore();
    const idArray = investigatorDB.getAllInvestigators(userId);
    return idArray;
}

io.on("getInvestigatorCollection", async (socket: Socket, userId: string,respond: (idArray: Array<{name: string, id: string}>) => void) => {
    const idArray = await getInvestigatorCollection(userId)
    respond(idArray)
})

export function emitInvestigatorCollection(idArray: Array<{name: string, id: string}>, respond: (idArray: Array<{name: string, id: string}>) => void){

}

export async function sendInvestigatorCollectionToWebsite(userId: string){

    const idArray = await getInvestigatorCollection(userId);

    

}
// will export dummy functions here and then real functions

import type { createCryptoConfigObj } from "../../../key-management-module/client/src"

type Update = Uint8Array


// this is all uncertain... but based on a previous draft
export function createCommunicationModuleClient<R extends string>(props: {
    docId: string,
    cryptoConfigObj: ReturnType<typeof createCryptoConfigObj>,
    // maybe: timeBatchingConfig,
    
    // serverConfig: { // or serverObject
    //     baseUrl: string,
    // },
}) {
    return {
        connect: () => {},
        disconnect: () => {},
        onConnected: (callback: (isReconnection: boolean) => void) => {},
        onDisconnected: (callback: (unexpected: boolean) => void) => {},
        
        
        addUpdates: (updates: Update[]) => {},

        /** todo: finalize how we should really indicate what updates are or are not in the snapshot */
        applySnapshot: async (
            updates: Update[],
            lastTimeIdToReplace: number
        ) => {},

        /** todo: finalize timeId and stuff like that... */
        subscribeToRemoteUpdates: (
            callback: (updates: Update[], updaterRole: R, timeId: number) => void
        ) => {},

        /** loads the full document from the server. Will be made up of snapshot + updates (snapshot already made up of updates) */
        getDocState: async () => {
            return [] as Update[]
        },
    }
}

// could maybe add a function to do an update to two different documents but transitionally. But do not need that yet

// could wrap this whole thing with a factory pattern to help share connection and stuff (or can use global file scope for one hardcoded connection sharing logic)

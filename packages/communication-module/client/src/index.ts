// will export dummy functions here and then real functions

type Update = Uint8Array

export function createCommunicationModuleClient(docId: string) {
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
            callback: (updates: Update[], timeId: number) => void
        ) => {},

        /** loads the full document from the server. Will be made up of snapshot + updates (snapshot already made up of updates) */
        getDocState: async () => {
            return [] as Update[]
        }
    }
}


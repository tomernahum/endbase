// will export dummy functions here and then real functions

type Update = Uint8Array

// placeholder
type VerifyingKeysMap<ValidRole extends string> = Record<ValidRole, {
    verifyingKey: CryptoKey;
    validOldVerifyingKeys: CryptoKey[];
}>;
export type CryptoConfig<ValidRole extends string> = "dummy" | {
    paddingLengthCheckpoints?: number[];
    mainEncryptionKey: CryptoKey;
    validOldEncryptionKeys?: CryptoKey[];
} & (
    {
        signingMode: "reader-skip-verifying";
    } | {
        signingMode: "reader";
        verifyingKeys: VerifyingKeysMap<ValidRole>;
    } | {
        signingMode: "writer";
        verifyingKeys: VerifyingKeysMap<ValidRole>;

        identity: ValidRole;
        signingKey: CryptoKey;
    }
);

// this is all uncertain... but based on a previous draft
export function createCommunicationModuleClient<R extends string>(props: {
    docId: string,
    cryptoConfig: CryptoConfig<R>,
    // maybe: timeBatchingConfig,
    // serverConfig: {
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


        setCryptoConfig: (cryptoConfig: CryptoConfig<R>) => {},
    }
}

// could maybe add a function to do an update to two different documents but transitionally. But do not need that yet

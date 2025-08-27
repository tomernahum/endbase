
// WIP
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


export function createCryptoConfigObj<ValidRole extends string>(props: {
    cryptoConfig: CryptoConfig<ValidRole>,
}) {
    // responsible for providing the crypto keys to communication module, and rotating them when necessary (will communicate with server for when that is needed, both to know when and to do it...)
    // still working out how key rotation will go. will add this feature last...  
    // may end up depending on communication module more to decide when... if so maybe I will rearchitect or have these two modules closely coupled sharing events between them
    return {
        getCryptoKeys: () => props.cryptoConfig, // maybe drill it down more
        get cryptoConfig() {
            return props.cryptoConfig
        },
        // maybe: 
        // onKeyRotation: (callback: () => void) => {},
    }
}
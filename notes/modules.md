Obviously subject to change with real world experience

State Management Module
    bridge between the end users app, and the encrypted communication module
    converts between state and change + snapshot messages 

    interprets received messages from communication-module -> state
    interprets change of state (however it exposes that to the application) -> change messages
    also handles caching / sync-engining state locally
    

    How to connect to application: can have multiple versions
    - one that is yjs provider
    - one that is redux clone
    - one that tries to back the local state into a local file

    easiest to start with is yjs provider




Encrypted Communication Module:
    Receives:
        from key distribution module: initial keys, updated/rotated keys
        from client-side state management module: 
            - plaintext change messages
            - plaintext snapshot messages
            - requests to subscribe to new change messages
            - requests to get latest snapshot message
    Does:
        relays messages between the encrypted server and the client-side state management module,
        - connects to the server, client module
        - encrypts/decrypts messages to/from server
            plaintext -> Ed25519 -> 10* padding -> AES-GCM -> encryption-scheme-version-stamper -> base64
    Sends:
        to server: encrypted change+snapshot messages
        to client-side state management module: decrypted change+snapshot messages

    Possible Submodules:
        - crypto (just the part that encrypts/decrypts messages)
        The Server (major)
            Naive solution: 
                sqlite + socketio
            Other solutions:
                - maybe look into ipfs for storage?




Key Distribution Module
    Naive solution to start with: 
        send appropriate keys out of band, or through TOFU public key
        , never rotate them

    Better solution:
        figure out later, but maybe 
        PKI for public keys, encrypt session keys using those
        regular key rotation (look into x3dh, noise, etc)
        can try to tie rotation events with events like snapshots

Code Verification/Transparency Module
    Naive solution to start with: 
        Trust me bro guarantee
    Other solutions:
        look into binary transparency, code signing/verification
        will probably need to be a browser extension
        see links on copywriting of https://chat.ttools.io/
    




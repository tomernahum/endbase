





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
    




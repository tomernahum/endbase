import { createCommunicationModuleClient } from "@ttools/communication-module-client";


// sample code
const client = createCommunicationModuleClient({
    docId: "test",
    cryptoConfig: "dummy" // TODO: I guess Key Distribution Module should have a client side module that is responsible for telling the communication module client what crypto config to use (maybe rename to Key Management Module). // How should we pass it in then? Should one of the two wrap the other one, and then expose here? should I provide a ref of this to the KMM  for it to update the keys, and then have it provide a function for initial keys? or it could expose a wrapper of the above function which is what I said before.
})

// ie this could be in the Key Management Module KMM
function createCommunicationModuleClientWrapped(docId:string) { 
    const client = createCommunicationModuleClient({
        docId,
        cryptoConfig: "dummy"
    })

    // todo keep client in our scope in case we need to update keys. 

    // Remove the ability to update keys from the return.
    const { setCryptoConfig, ...rest } = client

    return rest
}

// there might be a better way of course
// will look into it tomorrow now i'm tired will read https://claude.ai/chat/fe60d5fa-c0fd-4e7e-bdd7-4beee91985b9
// ok maybe we could just pass in key provider functions object (ie getCryptoConfig function or subscribeToCryptoConfigChanges function) instead of a static object
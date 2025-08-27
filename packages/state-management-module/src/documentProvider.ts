import { createCommunicationModuleClient } from "@ttools/communication-module-client"

//pseudo / exploratory code

function resolveUpdates(currentState: string, updates: Uint8Array[]) {
    return ""
}

function saveToLocalFile(state: string) {
    
}

export async function createTextDocumentProvider(
    props: {},
    communication: ReturnType<typeof createCommunicationModuleClient>,
) {
    await communication.connect()

    let plainTextDocState = ""

    const docUpdates = await communication.getDocState()
    plainTextDocState = resolveUpdates(plainTextDocState, docUpdates)
    // todo: conflict resolve with local state - will want to compare server state we last saw vs current state vs local state   (could just hash for first of those and add to our local file)
    saveToLocalFile(plainTextDocState)

    communication.subscribeToRemoteUpdates((updates, updaterRole, timeId) => {
        plainTextDocState = resolveUpdates(plainTextDocState, updates)
        saveToLocalFile(plainTextDocState)
    })
    function onClientUpdate(newPlainTextDocState: string) { // can also bind to react hook
        const update = f<Uint8Array>(plainTextDocState, newPlainTextDocState) // convert to update
        communication.addUpdates([update])
        plainTextDocState = resolveUpdates(plainTextDocState, [update])
        saveToLocalFile(plainTextDocState)
    }

    return {
        onClientUpdate,
    }
}


/** pseudocode helper */
function f<T=any>(...args: any[]) {
    return {} as T
}
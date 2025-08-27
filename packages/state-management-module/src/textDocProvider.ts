import type { createCommunicationModuleClient } from "@ttools/communication-module-client";

// type DocState = string

function resolveUpdates<DocState>(updates: Uint8Array[], currentState?: DocState) {
    return "" as DocState
    // TODO
}
function convertToUpdate<DocState>(oldState: DocState, newState: DocState) {
    return {} as Uint8Array
}

export function createTextDocumentProvider<DocState>(
    props: {
        initialState: DocState;
    },
    communication: ReturnType<typeof createCommunicationModuleClient>
) {
    const localStorageProvider = createLocalStorageProvider<DocState>()

    let state = localStorageProvider.getState() ?? props.initialState

    function _setState(newState: DocState) {
        state = newState
        localStorageProvider.setState(newState)
    }


    let connected = false


    // this part is not going to trigger yet as I haven't implemented communication / server
    communication.connect()
    communication.onConnected(async () => { // runs for initial connection and reconnection
        connected = true
        const remoteState = await communication.getDocState()
        // conflict resolve with local state - will want to compare server state we last saw vs current state vs local state   (could just hash for first of those and add to our local file)
        // for now we just overwrite local state 
        _setState(resolveUpdates<DocState>(remoteState))


        communication.subscribeToRemoteUpdates((updates, updaterRole, timeId) => {
            _setState(resolveUpdates(updates, state))
        })
    })
    communication.onDisconnected(() => {
        connected = false
    })
    


    function handleSetState(newState: DocState) {
        const update = convertToUpdate(state, newState)
        // _setState(resolveUpdates<DocState>([update], state)) // just to ensure consistency
        _setState(newState)
        
        // if (connected) {}
        communication.addUpdates([update])
        

    }
    
    return {
        setState: handleSetState,
        getState: () => state,
        subscribeToState: (callback: (state: DocState) => void) => {
            // TODO
        },
    };
}


function createLocalStorageProvider<DocState>(){
    return {
        setState: (state: DocState) => {
            console.log("set state", state)
        },
        getState: () => {
            return null as DocState | null
        }
    }
}
import { createCommunicationModuleClient } from "@ttools/communication-module-client";





export function createStateManagementModule(
    props: {},
    communication: ReturnType<typeof createCommunicationModuleClient>,
) {
    // now we can do a y.js provider here... or a document backed provider or whatever
}

export function createSimpleYjsProvider(
    props: {},
    communication: ReturnType<typeof createCommunicationModuleClient>,
) {
    return
}

export {createTextDocumentProvider} from "./textDocProvider"
import { createCommunicationModuleClient } from "@ttools/communication-module-client"
import { createCryptoConfigObj } from "@ttools/endbase-key-management-module-client"
import { createStateManagementModule, createTextDocumentProvider } from "@ttools/endbase-state-management-module"



export function createSimpleEndbase(props: {
    stateManagementProps: Parameters<typeof createStateManagementModule>[0],
}) {
    const keyManagement = createCryptoConfigObj({
        cryptoConfig: "dummy"
    })
    const communication = createCommunicationModuleClient({
        docId: "test",
        cryptoConfigObj: keyManagement 
    })
    const stateManagement = createStateManagementModule(props.stateManagementProps, communication)
    return stateManagement
}

export function createSimpleEndbaseWithDocumentProvider<DocState>(props: {
    stateManagementProps: Parameters<typeof createTextDocumentProvider<DocState>>[0],
}) {
    const keyManagement = createCryptoConfigObj({
        cryptoConfig: "dummy"
    })
    const communication = createCommunicationModuleClient({
        docId: "test",
        cryptoConfigObj: keyManagement 
    })
    const stateManagement = createTextDocumentProvider(props.stateManagementProps, communication)
    return stateManagement
}
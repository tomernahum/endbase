


// pseudo code
function createEndbase(cryptoConfig, serverConfig, stateManagementProps) {
    const keyManagement = createKeyManagementModuleClient(cryptoConfig)
    const communication = createCommunicationModuleClient({
        docId: "test",
        keyManagement: keyManagement // if kmm wants to rotate the keys, it can either just change them or communication can subscribe to events from it basically to initiate reverse direction communication... I think that would work
    })
    const stateManagement = createStateManagementModule(communication, stateManagementProps)
    return stateManagement

    // or

}
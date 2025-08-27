import { useState } from "react";
import { createSimpleEndbaseWithDocumentProvider } from "@ttools/endbase-client";

function App() {
  const [textAreaValue, setTextAreaValue] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setTextAreaValue(e.target.value)
    documentProvider.setState(e.target.value)
  }

  const documentProvider = createSimpleEndbaseWithDocumentProvider<string>({
    stateManagementProps: {
        initialState: "",
    },
  })

  return (
    <>
      <h1>Document Provider Demo</h1>
      <textarea
        value={textAreaValue}
        onChange={handleChange}
      />
    </>
  );
}

export default App;

import "./markdown.css";

import { Box, Button, Group, Stack } from "@mantine/core";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useState } from "react";

import { Monaco } from "../../Components/MonacoWrapper";
import { openFileAndGetData, saveDataToFile } from "../../utils/functions";

const Markdown = () => {
  const [source, setSource] = useState(`
# Markdown
- Supports every markdown feature + GitHub Flavored Markdown  
- Refer [GFM](https://github.github.com/gfm/)
- Supports footnotes
- ⛳️ Emoji support

\`\`\`js
const codeblock = () => {
    // Code with syntax highlighting 
}
\`\`\`
`);

  const openFile = async () => {
    const data = await openFileAndGetData(
      "Open Markdown File",
      [{ name: "Markdown", extensions: ["md"] }],
      "text"
    );
    setSource(data);
  };

  const saveFile = async () => {
    saveDataToFile(source, "Save Markdown File", [
      { name: "Markdown", extensions: ["md"] },
    ]);
  };

  return (
    <Stack sx={{ width: "100%", height: "100%" }}>
      <Group>
        <Button onClick={openFile}>Open md file</Button>
        <Button onClick={saveFile}>Save md file</Button>
      </Group>
      <Group sx={{ width: "100%", height: "100%" }} grow spacing={10}>
        <Box sx={{ width: "50%", height: "100%" }}>
          <Monaco
            setValue={(e) => setSource(e || "")}
            value={source}
            language="markdown"
          />
        </Box>
        <Box sx={{ width: "50%", height: "100%" }}>
          <MarkdownPreview
            source={source}
            style={{ padding: "15px", height: "100%", overflow: "scroll" }}
            linkTarget="_blank"
          />
        </Box>
      </Group>
    </Stack>
  );
};

export default Markdown;

// TODO: Save previous text

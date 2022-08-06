import { Button, CopyButton, Input } from "@mantine/core";
import { clipboard } from "@tauri-apps/api";
import { FaCopy } from "react-icons/fa";

type HashBoxProps = {
  value: string;
  hashtype: string;
};

export const HashBox = ({ value, hashtype }: HashBoxProps) => {
  return (
    <Input
      size="sm"
      rightSectionWidth={100}
      rightSection={
        <CopyButton value={value}>
          {({ copied, copy }) => (
            <Button
              leftIcon={<FaCopy />}
              size="xs"
              fullWidth={true}
              color={copied ? "teal" : "blue"}
              onClick={() => {
                copy(); //  copy doesn't work but need this function for animation.
                clipboard.writeText(value);
              }}
            >
              {copied ? "Copied" : `${hashtype}`}
            </Button>
          )}
        </CopyButton>
      }
      value={value}
      readOnly
    ></Input>
  );
};

import { useEffect, useState } from "react";
import { Button } from "../../components/button";
import { Card, CardBody, CardFooter, CardHeader } from "../../components/card";
import { CodeBlock } from "../../components/code-block";
import { Icon, type IconNameProps } from "../../components/icons";
import { Text } from "../../components/text";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../components/tooltip";
import { useCopy } from "../../hooks/use-copy";

interface Props {
  title: string;
  downloadUrl?: string;
  children: React.ReactNode;
  code?: string;
  className?: string;
}

interface ActionButtonProps {
  tooltip: string;
  icon: IconNameProps;
  onClick: () => void;
  side?: "bottom" | "top" | "left";
}

export default function MainSection({
  children,
  title,
  downloadUrl,
  code,
  className,
}: Props) {
  const { copy, copied } = useCopy();

  const [isExampleVisible, setIsExampleVisible] = useState(true);

  return (
    <Card size={"lg"} className={className}>
      <CardHeader
        divider
        className="flex flex-row items-center justify-between"
      >
        <Text as={"h3"} variant="p2" weight="semibold" value={title} />

        {!!downloadUrl && (
          <Button
            color="success"
            variant={"tertiary"}
            className="flex shrink-0 items-center gap-2"
            onClick={() => {
              window.open(downloadUrl, "_blank");
            }}
          >
            <Text
              variant="t1"
              color="success"
              className="translate-y-1"
              value="Unduh Font"
            />
            <Icon name="download" />
          </Button>
        )}
      </CardHeader>

      <CardBody>{children}</CardBody>

      {!!code && (
        <CardFooter className="flex flex-col gap-3 border-t">
          <div className="flex flex-col gap-3">
            <div className="flex flex-row items-center justify-between">
              <Text value="Contoh Kode" variant="t1" weight="medium" />
              <div className="flex flex-row items-center gap-2">
                <ActionButton
                  key={copied ? "copied" : "copy"}
                  tooltip={!copied ? "Salin Kode" : "Kode Disalin!"}
                  icon="copy-fill"
                  onClick={() => copy(code)}
                  side="bottom"
                />
                <ActionButton
                  side="left"
                  tooltip={
                    isExampleVisible ? "Sembunyikan Kode" : "Tampilkan Kode"
                  }
                  icon="code"
                  onClick={() => setIsExampleVisible(!isExampleVisible)}
                />
              </div>
            </div>
            {isExampleVisible && <CodeBlock code={code} />}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

const ActionButton = ({
  icon,
  onClick,
  tooltip,
  side = "top",
}: ActionButtonProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    const timer = setTimeout(() => setOpen(true), 10);
    return () => clearTimeout(timer);
  }, [tooltip]);

  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger asChild>
        <button onClick={onClick} className="cursor-pointer">
          <Icon name={icon} className="text-gray-900" />
        </button>
      </TooltipTrigger>
      <TooltipContent side={side}>{tooltip}</TooltipContent>
    </Tooltip>
  );
};

import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import { Card, CardBody } from "../../components/card";
import { Icon } from "../../components/icons";
import { Text } from "../../components/text";

interface Props {
  backTo?: string;
  nextTo?: string;
  title: string;
  backToTitle?: string;
  nextToTitle?: string;
}

export default function Footer({
  backTo,
  backToTitle,
  nextTo,
  nextToTitle,
  title,
}: Props) {
  const navigate = useNavigate();
  return (
    <Card className="mt-10">
      <CardBody className="relative flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            color="primary"
            size={"icon"}
            onClick={() => navigate(backTo ?? "/")}
            disabled={!backTo}
          >
            <Icon name="angle-left-small" />
          </Button>
          {!!backToTitle && (
            <Text
              variant="t2"
              weight="medium"
              value={backToTitle}
              className="text-primary-900"
            />
          )}
        </div>
        <Text
          variant="t2"
          value={title}
          className="absolute left-1/2 -translate-x-1/2 text-gray-600"
        />
        <div className="flex items-center gap-2">
          {!!nextToTitle && (
            <Text
              variant="t2"
              weight="medium"
              value={nextToTitle}
              className="text-primary-900"
            />
          )}
          <Button
            color="primary"
            size={"icon"}
            onClick={() => navigate(nextTo ?? "/")}
            disabled={!nextTo}
          >
            <Icon name="angle-right-small" />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

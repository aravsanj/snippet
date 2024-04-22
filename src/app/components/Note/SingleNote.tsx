import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DeleteAlert } from "./DeleteAlert";
import { Badge } from "@/components/ui/badge";
import Editor from "../Editor/Editor";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

type Props = {
  note: any;
};

const SingleNote = ({ note }: Props) => {
  const { id, title, content, tags, createdAt } = note;

  const date = dayjs(createdAt).format("MMMM D, YYYY");

  return (
    <>
      <Card className="relative w-[350px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{date}</CardDescription>
        </CardHeader>
        <CardContent className="h-[200px]">
          <span className="line-clamp-6">{content}</span>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="space-x-2">
            {tags &&
              tags.map((tag: any) => (
                <Badge key={tag.label}>{tag.value}</Badge>
              ))}
          </div>
          <DeleteAlert id={id} />
          <Editor id={id} />
        </CardFooter>
      </Card>
    </>
  );
};

export default SingleNote;

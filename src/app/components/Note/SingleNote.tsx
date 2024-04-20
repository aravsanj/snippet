import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {};

const SingleNote = ({ note }: any) => {
  const { id, title, note: content, createdAt } = note;
  return (
    <>
      <Card className="w-[350px] h-[200px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{content}</CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </>
  );
};

export default SingleNote;

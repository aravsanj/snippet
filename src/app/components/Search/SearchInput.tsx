import useNotes from "@/app/hooks/useNotes";
import { Input } from "@/components/ui/input";

function SearchInput() {
  const { search } = useNotes();

  return (
    <Input
      onChange={(e) => search(e.target.value)}
      className="mb-10 max-w-[300px]"
      type="search"
      placeholder="Search.."
    />
  );
}

export default SearchInput;

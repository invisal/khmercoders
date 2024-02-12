import { Avatar, AvatarFallback } from "./ui/avatar";

export default function ProfilePreview() {
  return (
    <div className="flex gap-4">
      <Avatar>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <div className="text-sm font-semibold">Rina Bouy</div>
        <div className="text-xs">Data Scientist</div>
      </div>
    </div>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const LoginAvatar: React.FC = () => {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/ninnroot.png" />
      <AvatarFallback>Thiha</AvatarFallback>
    </Avatar>
  );
};
export default LoginAvatar;

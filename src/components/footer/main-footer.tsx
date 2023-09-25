import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Facebook, Linkedin, Twitter } from "lucide-react";

const MainFooter = () => {
  return (
    <footer >
      <Separator className="my-2"></Separator>
      <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-5 content-center px-2">
        <div>
          <p className="text-4xl">ClassEase</p>
          <p>Use ClassEase for your school today!</p>
          <Button className="mt-3" variant="outline">
            Contact us
          </Button>
        </div>
        <div className=" underline ">
          <Link href={""}>
            <p>Terms of service</p>
          </Link>
          <Link href={""}>
            <p>Privacy policy</p>
          </Link>
          <Link href={""}>
            <p>About</p>
          </Link>
          <Link href={""}>
            <p>Contacts</p>
          </Link>
        </div>
        <div>
          <p>Follow us on social media</p>
          <div className="flex flex-wrap gap-3 mt-2">
            <Link href={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"} target="_blank">
              <Button size={"icon"} variant={"outline"}>
                <Linkedin></Linkedin>
              </Button>
            </Link>
            <Link href={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"} target="_blank">
              <Button size={"icon"} variant={"outline"}>
                <Facebook></Facebook>{" "}
              </Button>
            </Link>
            <Link href={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"} target="_blank">
              <Button size={"icon"} variant={"outline"}>
                <Twitter></Twitter>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;

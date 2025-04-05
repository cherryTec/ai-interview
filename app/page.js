import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from '@stackframe/stack';

export default function Home() {
  return (
    <div className="">
      <h2>Subcribe to Interview</h2>
      <Button>Subscribe</Button>
      <UserButton />
    </div>
    )
}

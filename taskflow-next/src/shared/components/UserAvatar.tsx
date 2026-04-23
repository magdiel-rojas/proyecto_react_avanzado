import Image from "next/image";

function UserAvatar({ src, name }: { src: string, name: string }) {
    return (<Image src={src} alt={name} width={40} height={40} className="rounded-full" />);
}

export { UserAvatar };
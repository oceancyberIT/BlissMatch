import Link from "next/link";

const SocialLink = ({ icon, href }: { icon: any; href: string }) => (
  <Link
    href={href}
    className="text-stone-300 hover:text-muted-burgundy-rose transition-all duration-300 transform hover:scale-110"
  >
    {icon}
  </Link>
);

export default SocialLink;

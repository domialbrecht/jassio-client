import Link from "next/link";
export default function Button({ href, text }) {
  return (
    <Link href={href}>
      <a className="px-8 py-3 text-2xl text-white tracking-widest bg-theme-highlight hover:bg-theme-contrast uppercase">
        {text}
      </a>
    </Link>
  );
}

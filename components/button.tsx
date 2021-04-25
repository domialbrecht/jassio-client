import Link from "next/link";

type ButtonProps = {
  href: string,
  text: string
}

export default ({ href, text }: ButtonProps) => (
    <Link href={href}>
      <a className="px-8 py-3 text-2xl text-white tracking-widest bg-theme-highlight hover:bg-theme-contrast uppercase">
        {text}
      </a>
    </Link>
)

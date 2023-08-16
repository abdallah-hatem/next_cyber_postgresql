import Link from "next/link";
import "./style.scss";

export default function LinkComponent({ url, children, useAnc }) {
  return !useAnc ? (
    <Link href={url} className="link">
      {children}
    </Link>
  ) : (
    <a href={url} className="link">
      {children}
    </a>
  );
}

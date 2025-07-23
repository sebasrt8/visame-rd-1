"use client";

import { useEffect, useState } from "react";
import { FacebookIcon, LinkedInIcon, TwitterIcon } from "./icons";

export function SharePost() {
  const [postUrl, setPostUrl] = useState("");

  useEffect(() => {
    setPostUrl(window.location.href);
  }, []);

  return (
    <div className="flex items-center gap-6">
      <h4 className="text-black dark:text-white">Share on</h4>

      <ul className="contents">
        <li>
          <Link
            href={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`}
            platform="Facebook"
          >
            <FacebookIcon />
          </Link>
        </li>

        <li>
          <Link
            href={`https://twitter.com/intent/tweet?url=${postUrl}`}
            platform="Twitter"
          >
            <TwitterIcon />
          </Link>
        </li>

        <li>
          <Link
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${postUrl}`}
            platform="LinkedIn"
          >
            <LinkedInIcon />
          </Link>
        </li>
      </ul>
    </div>
  );
}

type PropsType = {
  href: string;
  children: React.ReactNode;
  platform: string;
};

function Link({ children, href, platform }: PropsType) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-primary transition-colors duration-300"
    >
      <span className="sr-only">Share on {platform}</span>

      {children}
    </a>
  );
}

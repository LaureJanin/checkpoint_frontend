import React, { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  children: ReactNode;
}

const Header: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <header className="header">
        <h1>Checkpoint : frontend</h1>
        {router.pathname !== "/countries" ? (
          <Link href="/countries">Countrie</Link>
        ) : (
          <Link href="/">Home</Link>
        )}
      </header>
      {children}
    </>
  );
};

export default Header;

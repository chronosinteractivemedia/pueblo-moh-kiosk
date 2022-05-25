import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./Nav.module.scss";

export default function Nav({ items = [] }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setIsOpen(false);
    });
  }, []);

  return (
    <>

    </>
  );
}

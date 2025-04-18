import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FiArrowRight, FiMenu, FiX } from "react-icons/fi";
import styles from "./Nav.module.scss";
import MedalRotate from "../MedalRotate/MedalRotate";
import Acknowledgements from "../Acknowledgements/Acknowledgements";
import {Modal} from '../Modal/Modal';

export default function Nav({ items = [] }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showAcks, setShowAcks] = useState(false);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setIsOpen(false);
      setShowAcks(false);
    });
    window.openNav = () => {
      setIsOpen(true);
    }
    return () => {
      window.openNav = undefined;
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (window.navOpenListener) window.navOpenListener();
    } else {
      if (window.navCloseListener) window.navCloseListener();
      setShowAcks(false);
    }
  }, [isOpen]);

  return (
    <>
      <div
        className={`${styles.navToggle} nav`}
        onClick={() => setIsOpen(!isOpen)}
        data-open={isOpen}
      >
        {!isOpen ? (
          <>
            <FiMenu />
            <span>MENU</span>
          </>
        ) : (
          <FiX />
        )}
      </div>
      {!!isOpen && (
        <div className={styles.nav}>
          <h1>MENU</h1>
          <ul className={styles.links}>
            <Link href="/pueblo-recipients">
              <li data-active={router.asPath === "/pueblo-recipients"}>
                Pueblo Medal of Honor Recipients <FiArrowRight />
              </li>
            </Link>
            <Link href="/0">
              <li data-active={router.asPath === "/0"}>
                Pueblo Medal of Honor Memorial <FiArrowRight />
              </li>
            </Link>
            <Link href="/1">
              <li data-active={router.asPath === "/1"}>
                Pueblo: Home of Heroes <FiArrowRight />
              </li>
            </Link>
            <Link href="/2">
              <li data-active={router.asPath === "/2"}>
                History of the Medal of Honor <FiArrowRight />
              </li>
            </Link>
            <Link href="/moh-recipients">
              <li data-active={router.asPath === "/moh-recipients"}>
                Congressional Medal of Honor Recipients <FiArrowRight />
              </li>
            </Link>
            <Link href="/3">
              <li data-active={router.asPath === "/3"}>
                Veterans' Bridge <FiArrowRight />
              </li>
            </Link>
            <Link href="/4">
              <li data-active={router.asPath === "/4"}>
                Pueblo Latino Legacies of Courage <FiArrowRight />
              </li>
            </Link>
            <Link href="/area-attractions">
              <li data-active={router.asPath === "/area-attractions"}>
                Pueblo Attractions <FiArrowRight />
              </li>
            </Link>
          </ul>
          <MedalRotate playing={true} />
          <div className={styles.sponsorSection}>
            <h2>Sponsored By:</h2>
            <ul className={styles.sponsors}>
              <li>Pueblo Home of Heroes Association</li>
              <li>El Pomar Foundation</li>
              <li>Pueblo City Government</li>
              <li>Robert Hoag Rawlings Foundation</li>
              <li>Pueblo County Government</li>
              <li>Pueblo Urban Renewal Authority</li>
            </ul>
            <a onClick={() => setShowAcks(true)} href="javascript:void(0)">Acknowledgements</a>
          </div>
          {!!showAcks && (
            <Modal index={0} aboveAll={true} onClose={() => setShowAcks(false)}>
              <Acknowledgements />
            </Modal>
          )}
        </div>
      )}
    </>
  );
}

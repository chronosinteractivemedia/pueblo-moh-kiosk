import React, { useEffect } from "react";
import styles from "./Acknowledgements.module.scss";

export default function Acknowledgements() {
  useEffect(() => {window.trackEvent('view-acknowledgements')}, []);
  return (
    <div className={styles.component}>
      <div className={styles.wrapper}>
        <div className={styles.title}>ACKNOWLEDGEMENTS</div>
        <hr />
        <div className={styles.content}>
          <div className={styles.left}>
            <p>
              The Pueblo Home of Heroes Association is proud to present to you
              this Medal of Honor Information Center. It is the latest in our
              efforts to promote the ideals represented by the Medal of Honor,
              the United States highest award for military valor. It has been
              our honor and privilege to bring over 100 recipients of the Medal
              of Honor, during two of their Conventions, to Pueblo to promote
              patriotism and allow our citizens to get to know these men whose
              bravery and self-sacrifice make them our country’s greatest living
              military heroes.
            </p>
            <p>
              We wished to thank those who participated in the making of this
              display which became a reality 2022. This new display replaced the
              original which was unveiled in 1998. The location in the
              Convention Center and the scope of the display went through
              numerous iterations over the years. What you see here today is the
              culmination of thousands of hours of discussions, designs, fund
              raising and the help of a wonderful group of professionals,
              volunteer’s and advisors.
            </p>
            <p>
              <strong>Paulette Stuart, President</strong>
              <br />
              Pueblo Home of Heroes Association
            </p>
            <hr />
            <div className={styles.heading}>SPONSORS</div>
            <p>
              <strong>El Pomar Foundation</strong>
            </p>
            <p>
              <strong>Pueblo Board of County Commissioners</strong>
            </p>
            <p>
              <strong>Pueblo Home of Heroes Association</strong>
            </p>
            <p>
              <strong>Pueblo Urban Renewal Authority</strong>
            </p>
            <p>
              <strong>Robert Hoag Rawlings Foundation</strong>
            </p>
            <p>
              <strong>The City of Pueblo</strong>
            </p>
          </div>
          <div className={styles.right}>
            <div className={`${styles.heading} ${styles.float}`}>ORGANIZATIONS</div>
            <div className={styles.credits}>
              <ul className={styles.creditsLeft}>
                <li>Chronos Interactive</li>
                <li>Congressional Medal of Honor Society</li>
                <li>Digital Hart Media</li>
                <li>Historic Arkansas Riverwalk Project</li>
                <li>Houston Construction</li>
                <li>PG Exhibits + Environments</li>
                <li>Pueblo Convention Center</li>
                <li>Pueblo Home of Heroes Association</li>
                <li>Pueblo Urban Renewal Authority</li>
                <li>Weisbrod Aircraft Museum</li>
              </ul>
              <ul className={styles.creditsRight}>
                <li>Interactive design, programming and content</li>
                <li>Access to Medal of Honor database</li>
                <li>Technical and design support</li>
                <li>HARP photography and Veteran’s Bridge data</li>
                <li>Display design and installation</li>
                <li>Preparation of display space</li>
                <li>Planning and support</li>
                <li>Original display design and vision</li>
                <li>Construction over-sight</li>
                <li>Photography</li>
              </ul>
            </div>
            <div className={`${styles.heading} ${styles.floatB}`}>INDIVIDUALS</div>
            <div className={styles.credits}>
              <ul className={styles.creditsLeft}>
                <li>Tony Acri</li>
                <li>Lynn Clark</li>
                <li>Steve Eller</li>
                <li>Tom Ferbrache</li>
                <li>Nicki Hart</li>
                <li>Laura Jowdy</li>
                <li>Justin Martin</li>
                <li>Dave Moore</li>
                <li>Sandy Morrison</li>
                <li>Louis Nazario</li>
                <li>Kevin Ortiz</li>
                <li>James Stuart Sr.</li>
                <li>Stelios Stylianou</li>
              </ul>
              <ul className={styles.creditsRight}>
                <li>Site preparation project manager</li>
                <li>HARP Authority Executive Director</li>
                <li>Drone Photography</li>
                <li>PG Exhibits Project Manager</li>
                <li>Digital Hart Media</li>
                <li>Congressional Medal of Honor Society</li>
                <li>Veteran’s Bridge database</li>
                <li>Narrations</li>
                <li>Zoo photography</li>
                <li>Houston Construction</li>
                <li>Convention Center General Manager</li>
                <li>Project manager and designer</li>
                <li>Chronos Interactive</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

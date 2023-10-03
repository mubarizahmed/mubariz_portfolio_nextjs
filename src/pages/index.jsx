import { React, useEffect, useState } from "react";
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Typewriter from "typewriter-effect";
import { createClient } from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import DOMPurify from "isomorphic-dompurify";
import { Collapsible } from '@/components';

import styles from '@/styles/info.module.css'


export default function Home({ summary, experience, education }) {
  const [currHero, setCurrHero] = useState(1);
  const [loaded, setLoaded] = useState(false);

  const changeHero = (index) => {
    switch (index) {
      case 1:
        setCurrHero(1);
        break;
      case 2:
        setCurrHero(2);
        break;
      case 3:
        setCurrHero(3);
        break;
      default:
        break;
    }
  }

  // color toggle useEffect
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--color-current",
      `var(--color-${currHero})`
    );
  }, [currHero])

  return (
    <>
      <Head>
        <title>Mubariz Ahmed</title>
        <meta name="description" content="Mechatronics Engineer, hobbyist developer, and graphics designer." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='outlet__margin'>
        <div className={styles.info}>
          <section className=''>
            <div className={styles.hero}>
              <div className={styles.heroText}>
                <h1>
                  <div id="typewriter2"></div>
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter
                        .callFunction(() => {
                          setLoaded(false);
                        })
                        .changeDelay(50)
                        .typeString("Hello, there!")
                        .pauseFor(1000)
                        .typeString("<br>My name is Mubariz Ahmed")
                        .changeCursor(" ")
                        .start();
                    }}
                  />
                  <div className={styles.heroTextVariable}>
                    <Typewriter
                      options={{
                        autoStart: false,
                        cursor: " ",
                      }}
                      onInit={(typewriter) => {
                        typewriter
                          .pauseFor(4000)
                          .changeDelay(50)
                          .changeCursor("|")
                          .typeString("I am a ")
                          .callFunction(() => {
                            setLoaded(true);
                          })
                          .changeCursor(" ")
                          .start();
                      }}
                    />

                    {loaded && (
                      <Typewriter
                        options={{
                          autoStart: false,
                          loop: true,
                          cursor: " ",
                        }}
                        onInit={(typewriter) => {
                          typewriter
                            .changeCursor("|")
                            .changeDelay(50)
                            .changeDeleteSpeed(30)
                            .callFunction(() => {

                            })
                            .typeString(
                              "<span style='color: var(--color-1);'> Mechatronics Engineer</span>"
                            )
                            .pauseFor(2000)
                            .deleteChars(21)
                            .callFunction(() => {
                              changeHero(2);
                            })
                            .typeString(
                              "<span style='color: var(--color-2);'> Developer</span>"
                            )
                            .pauseFor(3000)
                            .deleteChars(9)
                            .callFunction(() => {
                              changeHero(3);
                            })
                            .typeString(
                              "<span style='color: var(--color-3);'> Graphics Designer</span>"
                            )
                            .pauseFor(2000)
                            .deleteChars(17)
                            .callFunction(() => {
                              changeHero(1);
                            })
                            .start();
                        }}
                      />
                    )}
                  </div>
                </h1>
              </div>
              <div className={styles.heroImage}>
                <div className={styles.heroImageLeft} />
                <img src='/hero-1.svg' alt="Hero 1" className={(currHero === 1) ? styles.heroImageActive : styles.heroImageInactive} />
                <img src='/hero-2.svg' alt="Hero 2" className={(currHero === 2) ? styles.heroImageActive : styles.heroImageInactive} />
                <img src='/hero-3.svg' alt="Hero 3" className={(currHero === 3) ? styles.heroImageActive : styles.heroImageInactive} />
              </div>
            </div>
          </section>
          <section className={styles.summary}>
            <hr className={styles.solid} />
            <div className={styles.layout}>
              <div className={styles.title}>
                <p>01</p>
                <h2>Summary</h2>
              </div>
              <div
                className={styles.details}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    documentToHtmlString(summary?.fields?.summary)
                  ),
                }}
              ></div>
            </div>
          </section>
          <section className={styles.experience}>
            <hr className={styles.solid} />
            <div className={styles.layout}>
              <div className={styles.title}>
                <p>02</p>
                <h2>Experience</h2>
              </div>
              <div className={styles.details}>
                <ul className={styles.items}>
                  {experience.map((item) => (
                    <li className={styles.item} key={item?.fields?.position}>
                      <Collapsible
                        label1={item?.fields?.position}
                        label2={item?.fields?.company}
                        label3={item?.fields?.time}
                        imageUrl={item?.fields?.logo?.fields?.file?.url}
                        imageAlt={item?.fields?.logo?.fields?.title}
                      >
                        <div
                          className={styles.itemCollapsible}
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                              documentToHtmlString(item?.fields?.details)
                            ),
                          }}
                        ></div>
                      </Collapsible>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          <section className={styles.education}>
            <hr className={styles.solid} />
            <div className={styles.layout}>
              <div className={styles.title}>
                <p>03</p>
                <h2>Education</h2>
              </div>
              <div className={styles.details}>
                <ul className={styles.items}>
                  {education.map((item) => (
                    <li className={styles.item} key={item?.fields?.degree}>
                      <div className={styles.itemText}>
                        <Collapsible
                          label1={item?.fields?.degree}
                          label2={item?.fields?.school}
                          label3={item?.fields?.time}
                          imageUrl={item?.fields?.logo?.fields?.file?.url}
                          imageAlt={item?.fields?.logo?.fields?.title}
                        >
                          <div
                            className={styles.itemCollapsible}
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                documentToHtmlString(item?.fields?.details)
                              ),
                            }}
                          ></div>
                        </Collapsible>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts
  let summary = {};
  let experience = [];
  let education = [];
  const client = createClient({
    space: process.env.REACT_APP_SPACE,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  });

  try {
    await client.getEntries({ content_type: "info" }).then((entries) => {
      console.log(entries.items[0]);
      summary = entries.items[0];
    });
    await client
      .getEntries({ content_type: "experience", order: "fields.id" })
      .then((entries) => {
        console.log(entries.items);
        experience = entries.items;
      });
    await client
      .getEntries({ content_type: "education", order: "fields.id" })
      .then((entries) => {
        console.log(entries);
        education = entries.items;
      });
  } catch (error) {
    console.log(error);
  }
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      summary,
      experience,
      education,

    },
  }
}
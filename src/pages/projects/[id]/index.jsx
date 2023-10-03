import React, { useEffect, useState } from "react";
import Head from "next/head";
import { createClient } from "contentful";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import { IconContext } from "react-icons";
import { RiGithubFill } from "react-icons/ri";
import { LuFileBox } from "react-icons/lu";
import { SlGlobe } from "react-icons/sl";

import styles from "@/styles/projectDetails.module.css";

const ProjectDetails = ({ content, body, css, title }) => {
  return (
    <>
      <Head>
        <title>{title} - Mubariz Ahmed</title>
        <meta name="description" content={content?.fields?.description} />
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </Head>
      <div className={styles.blog}>
        <div className={styles.hero}>
          <div className={styles.heroLeft}>
            <div className={styles.heroCategory}>{content?.fields?.category}</div>
            <div className={styles.heroTitle}>{content?.fields?.title}</div>
            <IconContext.Provider value={{ className: styles.icon }}>
              <div className={styles.heroLinks} >
                {content.fields?.githubLink ?
                  <a className={styles.linkButton} href={content.fields?.githubLink} target="_blank">
                    <RiGithubFill className={styles.icon} size="1.5em" />
                    Repo
                  </a> : null
                }
                {content.fields?.grabcadLink ?
                  <a className={styles.linkButton} href={content.fields?.grabcadLink} target="_blank">
                    <LuFileBox className={styles.icon} size="1.5em" />
                    GrabCAD</a> : null
                }
                {content.fields?.websiteLink ?
                  <a className={styles.linkButton} href={content.fields?.websiteLink} target="_blank">
                    <SlGlobe className={styles.icon} size="1.5em" />
                    {content.fields?.websiteName}</a> : null
                }
              </div>
            </IconContext.Provider>
            <div className={styles.heroTags}>
              {content?.fields?.tags.map((item) => (
                <div className={styles.tag} key={item}>{item}</div>
              ))}
            </div>

          </div>
          <div className={styles.heroRight}>
            <img src={content?.fields?.cover?.fields?.file?.url} alt={content?.fields?.title} />
          </div>
        </div>
        <div className={styles.body} dangerouslySetInnerHTML={{ __html: body }}>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;


export const getStaticPaths = async () => {
  const client = createClient({
    space: process.env.REACT_APP_SPACE,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  });

  const res = await client.getEntries({
    content_type: "project",
  });

  const paths = res.items.map((item) => {
    return {
      params: { id: item.sys.id },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async ({ params }) => {
  const client = createClient({
    space: process.env.REACT_APP_SPACE,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  });

  const { id } = params;
  let res = await client.getEntry(id);

  let body = {};

  if (res.fields.detailsMd) {
    body = DOMPurify.sanitize(marked.parse(res.fields.detailsMd));
  }

  console.log(body);

  let css = ''
  switch (res?.fields?.category) {
    case "Engineering":
      css = `  body {
        --color-current: var(--color-1);
      } `
      break;
    case "Software":
      css = `  body {
        --color-current: var(--color-2);
      } `
      break;
    case "Design":
      css = `  body {
        --color-current: var(--color-3);
      } `
      break;
    default:
      break;
  }

  const title = res.fields.title;

  console.log(css);

  return {
    props: {
      content: res,
      body,
      css,
      title,
    },
  };
}


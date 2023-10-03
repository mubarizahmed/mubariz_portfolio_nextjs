import React, { useEffect, useState } from "react";

import Link from "next/link";
import { createClient } from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import { IconContext } from "react-icons";
import { RiGithubFill } from "react-icons/ri";
import { LuFileBox } from "react-icons/lu";
import { SlGlobe } from "react-icons/sl";
import styles from "@/styles/projectDetails.module.css";

const ProjectDetails = ({ content, body }) => {

  useEffect(() => {
    switch (content?.fields?.category) {
      case "Engineering":
        document.documentElement.style.setProperty(
          "--color-current",
          "var(--color-1)"
        );
        break;
      case "Software":
        document.documentElement.style.setProperty(
          "--color-current",
          "var(--color-2)"
        );
        break;
      case "Design":
        document.documentElement.style.setProperty(
          "--color-current",
          "var(--color-3)"
        );
        break;
      default:
        break;
    }

  }, [content]);

  console.log(content);

  const renderOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { title, description, file } = node.data.target.fields;
        const mimeType = file.contentType;
        const mimeGroup = mimeType.split("/")[0];

        switch (mimeGroup) {
          case "image":
            return (
              <img
                title={title ? title : null}
                alt={description ? description : null}
                src={file.url}
              />
            );
          case "application":
            return (
              <a alt={description ? description : null} href={file.url}>
                {title ? title : file.details.fileName}
              </a>
            );
          default:
            return (
              <span styles={{ backgroundColor: "red", color: "white" }}>
                {" "}
                {mimeType} embedded asset{" "}
              </span>
            );
        }
      },
    },
  };

  return (
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

  return {
    props: {
      content: res,
      body
    },
  };
}


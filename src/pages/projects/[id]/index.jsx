import React, { useEffect, useState } from "react";

import Link from "next/link";
import { createClient } from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import DOMPurify from "isomorphic-dompurify";
import styles from "@/styles/projectDetails.module.css";

const ProjectDetails = ({ content }) => {

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
      <div className={styles.body}>
        {documentToReactComponents(content?.fields?.details, renderOptions)}
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

  return {
    props: {
      content: res,
    },
  };
}


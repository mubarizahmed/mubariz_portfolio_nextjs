import React, { useEffect, useState } from "react";
import Head from 'next/head'
import { createClient } from "contentful";
import { Card } from "../../components";
import { motion } from "framer-motion";
import { RiFilter2Fill } from "react-icons/ri";

import styles from "@/styles/projects.module.css";

const Projects = ({ projects, filterTags }) => {
  const [toggleState, setToggleState] = useState(1);
  const [viewData, setViewData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  // update view data
  useEffect(() => {
    const updateViewData = () => {
      if (filterTags[toggleState - 1].every((x) => x.enabled === false)) {
        setViewData(projects[toggleState - 1]);
        return;
      }
      setViewData(
        projects[toggleState - 1].filter((i) => {
          for (const tag of i.fields.tags) {
            //console.log(filterTags);
            const index = filterTags[toggleState - 1].findIndex((x) => x.name === tag);
            //console.log(index);
            if (!(index === -1) && filterTags[toggleState - 1][index].enabled) {
              return true;
            }
          }
          return false;
        })
      );
    };

    console.log(filterTags, projects, toggleState)
    if (projects[toggleState - 1] && filterTags[toggleState - 1]) {
      updateViewData();
    }
  }, [filterTags, projects, toggleState]);

  // update current color
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--color-current",
      `var(--color-${toggleState})`
    );
  }, [toggleState])

  return (
    <>
      <Head>
        <title>Projects - Mubariz Ahmed</title>
        <meta name="description" content="Showcase of projects I've undertaken." />

      </Head>
      <div className={'outlet__margin ' + styles.projects}>
        <motion.div layout className={styles.tabBlock}>
          {['Engineering', 'Software', 'Design', 'All'].map((item, index) => (
            <div
              className={
                toggleState === index + 1
                  ? [styles.tabs, styles.tabActive, styles[`tab${index + 1}Active`]].join(' ')
                  : [styles.tabs, styles[`tab${index + 1}Inactive`]].join(' ')
              }
              onClick={() => setToggleState(index + 1)}
              key={index}
            >
              {item}
            </div>
          ))}
        </motion.div>
        <hr className={styles.dividerSolid + ' ' + styles[`divider${toggleState}`]} />
        <motion.div
          layout
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}

          transition={{ duration: 1 }}
          className={styles.tagSelector}>
          {showFilter ?
            filterTags[toggleState - 1].map((item) => (
              <motion.div layout
                className={item.enabled ? styles.tag + ' ' + styles.tagEnabled : styles.tag}
                key={item.name}
                onClick={() => toggleFilter(item.name)}
              >
                {item.enabled ? <span>&#10005;</span> : null}
                {item.name}
              </motion.div>
            ))
            : ''}
          <motion.div layout
            className={styles.filterButton + ' ' + (showFilter ? styles.filterButtonActive : '')}
            onClick={() => setShowFilter(!showFilter)}
          >
            <RiFilter2Fill />

          </motion.div>

        </motion.div>
        <motion.div layout className={styles.content}>
          {viewData &&
            viewData.map((project) => (
              <Card
                key={project?.sys?.id}
                id={project?.sys?.id}
                title={project?.fields?.title}
                cover={project?.fields?.cover?.fields?.file?.url}
                details={project?.fields?.tags}
              ></Card>

            ))}
        </motion.div>
      </div>
    </>
  );
};

export default Projects;

export async function getStaticProps() {
  const client = createClient({
    space: process.env.REACT_APP_SPACE,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  });

  let projects = [];

  await client.getEntries({ content_type: "project" }).then((entries) => {
    //console.log(entries);
    projects = [
      entries.items.filter((x) => x.fields.category === "Engineering"),
      entries.items.filter((x) => x.fields.category === "Software"),
      entries.items.filter((x) => x.fields.category === "Design"),
      entries.items,
    ]

  });

  let filterTags = [];

  projects.forEach((project, index) => {
    const tags = [];
    const tagsEnabled = [];
    //console.log(currentData);
    project.forEach(function (value) {
      //console.log(value);
      value.fields.tags.forEach(function (t) {
        if (tags.indexOf(t) === -1) {
          tags.push(t);
          tagsEnabled.push({ name: t, enabled: false });
        }
      });
    });
    filterTags[index] = tagsEnabled;
  });

  console.log(projects);
  console.log(filterTags);

  return {
    props: {
      projects,
      filterTags
    }
  };
}
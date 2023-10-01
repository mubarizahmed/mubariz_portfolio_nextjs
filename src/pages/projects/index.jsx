import React, { useEffect, useState } from "react";
import { createClient } from "contentful";
import styles from "@/styles/projects.module.css";
import { Card } from "../../components";
import { motion } from "framer-motion";

const Projects = ({ projects, filterTags }) => {

  const [toggleState, setToggleState] = useState(1);
  const [viewData, setViewData] = useState([]);


  //updateViewData()
  const updateViewData = () => {
    if (filterTags[toggleState-1].every((x) => x.enabled === false)) {
      setViewData(projects[toggleState - 1]);
      return;
    }
    setViewData(
      projects[toggleState - 1].filter((i) => {
        for (const tag of i.fields.tags) {
          //console.log(filterTags);
          const index = filterTags[toggleState-1].findIndex((x) => x.name === tag);
          //console.log(index);
          if (!(index === -1) && filterTags[toggleState-1][index].enabled) {
            return true;
          }
        }
        return false;
      })
    );
  };

  useEffect(() => {
    
    console.log(filterTags, projects, toggleState)
    if (projects[toggleState - 1] && filterTags[toggleState - 1]) {
      updateViewData();
      console.log(viewData);
    }
  }, [filterTags, projects, toggleState]);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--color-current",
      `var(--color-${toggleState})`
    );
  }, [toggleState])

  const toggleFilter = (name) => {
    console.log(name);
    try {
      const newFilterTags = [...filterTags];
      const index = newFilterTags[toggleState-1].findIndex((obj) => obj.name === name);
      newFilterTags[toggleState-1][index].enabled = !newFilterTags[toggleState-1][index].enabled;
      //console.log(newFilterTags[index].enabled);
      filterTags = newFilterTags;
      updateViewData();
    } catch (error) {
      console.log(error);
    }
  };

  //console.log(filterTags);

  return (
    <div className={'outlet__margin ' + styles.projects}>
      <motion.div layout className={styles.tabBlock}>
        {['Engineering', 'Software', 'Design', 'All'].map((item,index) => (
        <div
          className={
            toggleState === index+1
              ? [styles.tabs,styles.tabActive,styles[`tab${index+1}Active`]].join(' ')
              : [styles.tabs,styles[`tab${index+1}Inactive`]].join(' ')
          }
          onClick={() => toggleTab(index+1)}
          key={index}
        >
          {item}
        </div>
        ))}
      </motion.div>
      <hr className={ styles.dividerSolid + ' ' + styles[`divider${toggleState}`]} />
      <motion.div
        layout
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}

        transition={{ duration: 1 }}
        className={styles.tagSelector}>
        {filterTags[toggleState-1].map((item) => (
          <motion.div layout
            className={item.enabled ? styles.tag + ' ' + styles.tagEnabled: styles.tag}
            key={item.name}
            onClick={() => toggleFilter(item.name)}
          >
            {item.enabled ? <span>&#10005;</span> : null}
            {item.name}
          </motion.div>
        ))}
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
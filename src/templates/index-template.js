import React from "react"
import { Link } from "gatsby"
import { useSiteMetadata } from '../hooks';
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import Page from '../components/Page'
import Feed from '../components/Feed'
import Pagination from '../components/Pagination';
const IndexTemplate = ({ data, pageContext }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();

  const {
    currentPage,
    hasNextPage,
    hasPrevPage,
    prevPagePath,
    nextPagePath
  } = pageContext;


  const { edges } = data.allMarkdownRemark;
  const pageTitle = currentPage > 0 ? `Posts - Page ${currentPage} - ${siteTitle}` : siteTitle;

  // return (
  //   <Layout title={pageTitle} description={siteSubtitle}>
  //     <Sidebar isIndex />
  //     <Page>
  //       <Feed edges={edges} />
  //       <Pagination
  //         prevPagePath={prevPagePath}
  //         nextPagePath={nextPagePath}
  //         hasPrevPage={hasPrevPage}
  //         hasNextPage={hasNextPage}
  //       />
  //     </Page>
  //   </Layout>
  // );
};

export default ({ pageContext }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const {items} = pageContext
  const pageTitle = 0 > 0 ? `Posts -  ${siteTitle}` : siteTitle;
  const {
    currentPage,
    hasNextPage,
    hasPrevPage,
    prevPagePath,
    nextPagePath
  } = pageContext;


  return  <Layout title={pageTitle} description={siteSubtitle}>
    <Sidebar/>
    <Page>
      <Feed items={items} pageContext = { pageContext} />
      <Pagination
        prevPagePath={prevPagePath}
        nextPagePath={nextPagePath}
        hasPrevPage={hasPrevPage}
        hasNextPage={hasNextPage}
      />
    </Page>
  </Layout>
}
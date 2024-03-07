import { getApolloClient } from 'lib/apollo-client';

import { QUERY_ALL_PAGES, QUERY_ALL_PAGES_ARCHIVE, QUERY_ALL_PAGES_INDEX, QUERY_PAGE_BY_URI } from 'data/pages';

/**
 * pagePathBySlug
 */

export function pagePathBySlug(slug) {
  return `/${slug}`;
}

/**
 * getPageByUri
 */

export async function getPageByUri(uri) {
  const apolloClient = getApolloClient();

  let pageData;

  try {
    pageData = await apolloClient.query({
      query: QUERY_PAGE_BY_URI,
      variables: {
        uri,
      },
    });
  } catch (e) {
    console.log(`[pages][getPageByUri] Failed to query page data: ${e.message}`);
    throw e;
  }

  if (!pageData?.data.page) return { page: undefined };

  const page = [pageData?.data.page].map(mapPageData)[0];

  return {
    page,
  };
}

/**
 * getAllPages
 */

const allPagesIncludesTypes = {
  all: QUERY_ALL_PAGES,
  archive: QUERY_ALL_PAGES_ARCHIVE,
  index: QUERY_ALL_PAGES_INDEX,
};

export async function getAllPages(options = {}) {
  const { queryIncludes = 'index' } = options;

  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: allPagesIncludesTypes[queryIncludes],
  });

  const pages = data?.data.pages.edges.map(({ node = {} }) => node).map(mapPageData);

  return {
    pages,
  };
}

/**
 * getTopLevelPages
 */

export async function getTopLevelPages(options) {
  const { pages } = await getAllPages(options);

  const navPages = pages.filter(({ parent }) => parent === null);

  // Order pages by menuOrder
  navPages.sort((a, b) => parseFloat(a.menuOrder) - parseFloat(b.menuOrder));

  return navPages;
}

/**
 * mapPageData
 */

export function mapPageData(page = {}) {
  const data = { ...page };

  if (data.featuredImage) {
    data.featuredImage = data.featuredImage.node;
  }

  if (data.parent) {
    data.parent = data.parent.node;
  }

  if (data.children) {
    data.children = data.children.edges.map(({ node }) => node);
  }

  return data;
}

/**
 * getBreadcrumbsByUri
 */

export function getBreadcrumbsByUri(uri, pages) {
  const breadcrumbs = [];
  const uriSegments = uri.split('/').filter((segment) => segment !== '');

  // We don't want to show the current page in the breadcrumbs, so pop off
  // the last chunk before we start

  uriSegments.pop();

  // Work through each of the segments, popping off the last chunk and finding the related
  // page to gather the metadata for the breadcrumbs

  do {
    const breadcrumb = pages.find((page) => page.uri === `/${uriSegments.join('/')}/`);

    // If the breadcrumb is the active page, we want to pass udefined for the uri to
    // avoid the breadcrumbs being rendered as a link, given it's the current page

    if (breadcrumb) {
      breadcrumbs.push({
        id: breadcrumb.id,
        title: breadcrumb.title,
        uri: breadcrumb.uri,
      });
    }

    uriSegments.pop();
  } while (uriSegments.length > 0);

  // When working through the segments, we're doing so from the lowest child to the parent
  // which means the parent will be at the end of the array. We need to reverse to show
  // the correct order for breadcrumbs

  breadcrumbs.reverse();

  return breadcrumbs;
}

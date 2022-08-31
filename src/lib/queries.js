import dotenv from "dotenv";
dotenv.config();
const API_URL = import.meta.env.WP_URL;

/******************* 
BASE FETCH API CALL
********************/

async function fetchAPI(query, { variables } = {}) {
  const headers = { "Content-Type": "application/json" };
  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) {
    console.log(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

/******************* 
GET ABOUT PAGE CONTENT
********************/

export async function getAboutPageContent() {
  const data = await fetchAPI(`
    {
      page(id: "about", idType: URI) {
        title
        content
      }
    }
  `);
  return data?.page;
}

/******************* 
GET BLOG PAGE CONTENT
********************/

export async function getBlogPageContent() {
  const data = await fetchAPI(`
    {
      page(id: "blog", idType: URI) {
        title
        content
      }
    }
  `);
  return data?.page;
}

/******************* 
GET PODCAST PAGE CONTENT
********************/

export async function getPodcastsPageContent() {
  const data = await fetchAPI(`
    {
      page(id: "podcasts", idType: URI) {
        title
        content
      }
    }
  `);
  return data?.page;
}

/******************* 
GET RESOURCES PAGE CONTENT
********************/

export async function getResourcesPageContent() {
  const data = await fetchAPI(`
    {
      page(id: "resources", idType: URI) {
        title
        content
      }
    }
  `);
  return data?.page;
}

/******************* 
GET ALL POSTS
********************/

export async function getAllPosts() {
  const data = await fetchAPI(`
        {
          posts(first: 10000) {
            edges {
              node {
                id
                title
                content
                excerpt
                slug
                categories(first: 2) {
                  edges {
                    node {
                      slug
                      name
                    }
                  }
                }
                featuredImage {
                  node {
                    sourceUrl
                  }
                }
              }
            }
          }
        }
    `);
  return data?.posts;
}

/******************* 
GET SINGLE POST
********************/

export async function getPost(slug) {
  const data = await fetchAPI(`
      {
          post(id: "${slug}", idType: URI) {
              title
              content
              categories(first: 3) {
                edges {
                  node {
                    name
                    slug
                  }
                }
              }
              featuredImage {
                node {
                  sourceUrl
                }
              }
          }
      }
      `);

  return data?.post;
}

/******************* 
GET ALL PODCASTS
********************/

export async function getAllPodcasts() {
  const data = await fetchAPI(`
    {
      podcasts(first: 1000) {
        edges {
          node {
            id
            title
            content
            slug
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
  `);

  return data?.podcasts;
}

/******************* 
GET SINGLE PODCAST
********************/

export async function getPodcast(slug) {
  const data = await fetchAPI(`
    {
      podcast(id: "${slug}", idType: URI) {
        title
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  `);

  return data?.podcast;
}

/******************* 
GET ALL TESTIMONIALS
********************/

export async function getAllTestimonials() {
  const data = await fetchAPI(`
  {
    testimonials(first: 100) {
      edges {
        node {
          id
          content
          testimonials {
            author
            title
          }
        }
      }
    }
  }
`);

  return data?.testimonials;
}

/******************* 
GET ALL DOWNLOADS
********************/

export async function getAllDownloads() {
  const data = await fetchAPI(`
  {
    downloads(first: 100) {
      edges {
        node {
          id
          content
          title
          featuredImage {
            node {
              sourceUrl
            }
          }
          downloads {
            link
          }
        }
      }
    }
  }
`);

  return data?.downloads;
}

/******************* 
GET ALL CATEGORIES
********************/

export async function getAllCategories() {
  const data = await fetchAPI(`
    {
      categories(first: 100) {
        edges {
          node {
            slug
            name
          }
        }
      }
    }
  `);

  return data?.categories;
}

/******************* 
GET ALL POSTS BY CATEGORY
********************/

export async function getAllPostsByCategory(category) {
  const data = await fetchAPI(`
        {
          posts(first: 1000, where: {categoryName: "${category}"} ) {
            edges {
              node {
                id
                title
                content
                excerpt
                slug
                featuredImage {
                  node {
                    sourceUrl
                  }
                }
              }
            }
          }
        }
    `);
  return data?.posts;
}

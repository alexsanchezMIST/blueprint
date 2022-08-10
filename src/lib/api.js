import dotenv from "dotenv";
dotenv.config();
const API_URL = import.meta.env.WP_URL;

/******************* 
STANDARD FETCH API CALL
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
GET ALL POSTS
********************/

export async function getAllPosts() {
  const data = await fetchAPI(`
        {
            posts(first: 10000) {
                edges {
                    node {
                        title
                        slug
                        excerpt
                    }
                }
            }
        }
    `);

  return data?.posts;
}

/******************* 
GET POST BY SLUG
********************/

export async function getPost(slug) {
  const data = await fetchAPI(`
    {
        post(id: "${slug}", idType: URI) {
            title
            content
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
              posts(first: 10000, where: { tag: "podcast-episode" }) {
                  edges {
                      node {
                          title
                          slug
                          excerpt
                          }
                      }
                  }
              }
      `);

  return data?.posts;
}

/******************* 
GET ALL TESTIMONIALS
********************/

export async function getAllTestimonials() {
  const data = await fetchAPI(`
    {
      testimonials(first: 1000) {
        edges {
          node {
            testimonials {
              author
              title
            }
            content
          }
        }
      }
    }
  `);

  return data?.testimonials;
}

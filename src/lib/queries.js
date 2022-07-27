export const getAllPostsWithSlug = `
{
    posts(first: 10000) {
        edges {
            node {
                slug
            }
        }
    }
}
`;

export const getFirstPostsWithSlug = `
    query AllPosts($first: Int) {
        posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
            edges {
                node {
                    title
                    excerpt
                    slug
                    content
                    date
                    featuredImage {
                        node {
                            sourceUrl
                            altText
                        }
                    }
                    author {
                        node {
                            name
                            firstName
                            lastName
                            avatar {
                                url
                            }
                        }
                    }
                }
            }
        }
    }
`;

export const findPostBySlug = `
    query findPostBySlug($slug: String!) {
        postBy(slug: $slug) {
            title
            featuredImage {
                node {
                    sourceUrl
                }
            }
            content
            date
            author {
                node {
                    name
                    firstName
                    lastName
                    avatar {
                        url
                    }
                }
            }
        }
    }
`;

const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const result = await graphql(`
        query GetPages{
            products: allStrapiProducts {
                nodes {
                    slug
                }
            }

           categories: allStrapiCategories {
                nodes {
                  slug
                }
            }
        }
    `);

    result.data.products.nodes.forEach((product) => {
        createPage({
            path: `/products/${product.slug}`,
            component: path.resolve(`src/templates/product-template.js`),
            context: {
                slug: product.slug,
            }
        })
    })

    result.data.categories.nodes.forEach((category) => {
        createPage({
            path: `/categories/${category.slug}`,
            component: path.resolve(`src/templates/category-template.js`),
            context: {
                slug: category.slug,
            }
        })
    })

}
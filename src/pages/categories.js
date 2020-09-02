import React from 'react';
import Layout from '../components/layout/layout';
import StyledProductCard from '../components/styledProductCard/styledProductCard';
import { graphql } from 'gatsby';

export const query = graphql`
  {
    allStrapiCategories {
      categories: nodes {
        id
        name
        slug
        products {
          id
        }
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`


const Categories = ({ data }) => {
  const categories = data.allStrapiCategories.categories;
  const Categories = () => {
    return (
      <div className="products">
        {categories.map((category, index) => {
          const itemsSet = new Set(category.products.map(product => product.id));
          return <StyledProductCard
            key={`category-${index}`}
            type="category"
            link={`/categories/${category.slug}`}
            title={category.name}
            items={itemsSet.size}
            image={category.image.childImageSharp.fluid} />
        })}
      </div>
    )
  }
  return (
    <Layout>
      <header className="categories__jumbotron">
        <div className="categories__jumbotron-container">
          <article className="categories__jumbotron-content">
            <p className="categories__jumbotron-dest">Home / Categories</p>
            <h1 className="categories__jumbotron-title">Categories</h1>
          </article>
        </div>
      </header>

      <section className="categories-section">
        <div className="container">
          <Categories />
        </div>
      </section>
    </Layout>
  )
}

export default Categories

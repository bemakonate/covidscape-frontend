import React from 'react';
import Layout from '../components/layout/layout';
import StyledProductCard from '../components/reusable/styledProductCard';
import { graphql, Link } from 'gatsby';
import SEO from '../components/reusable/SEO';

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
            image={category.image} />
        })}
      </div>
    )
  }

  return (
    <Layout>
      <SEO title="Categories" />
      <header className="categories__jumbotron">
        <div className="categories__jumbotron-container">
          <article className="categories__jumbotron-content">
            <p className="categories__jumbotron-dest"><Link to="/">Home</Link> / Categories</p>
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

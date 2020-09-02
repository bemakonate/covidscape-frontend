import React, { useState } from 'react'
import Layout from '../components/layout/layout';
import StyledProductCard from '../components/styledProductCard/styledProductCard';
import { graphql, useStaticQuery } from "gatsby";
import categories from '../constants/categories';
import BackgroundImage from 'gatsby-background-image';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';



export const query = graphql`
query GetCategory($slug: String){
    products: allStrapiProducts {
      nodes {
        id
        price
        title
        slug
        image{
            childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
            }
        }
      }
    }

    category: strapiCategories(slug: {eq: $slug}) {
        name
        image {
          childImageSharp {
            fluid {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
    }
  }
`


const AllProducts = ({ data }) => {

    const [categoriesDropdown, setCategoriesDropdown] = useState(false);
    const allProducts = data.products.nodes;
    const bgImage = data.category.image.childImageSharp.fluid;
    const category = data.category;


    const Products = () => {
        return (
            <div className="products">
                {allProducts.map(product =>
                    <StyledProductCard
                        key={product.id}
                        type="product"
                        title={product.title}
                        price={product.price}
                        link={`/products/${product.slug}`}
                        image={product.image.childImageSharp.fluid} />
                )}
            </div>
        )
    }
    const toggleCategoriesDropdown = () => setCategoriesDropdown(!categoriesDropdown);

    return (
        <Layout>
            <header className={`header-height ${categoriesDropdown ? 'categories-dropdown' : null}`}>
                <BackgroundImage
                    Tag="div"
                    fluid={bgImage}
                    preserveStackingContext={true}
                    className='shop__jumbotron'>
                    <div className="shop__jumbotron-content">
                        <div className="container">
                            <p className="shop__breadcrumb-list">Home / Categories / {category.name}</p>
                            <h1 className="shop__jumbotron-title">{category.name}</h1>
                        </div>

                    </div>

                </BackgroundImage>
            </header>
            <section className="section-padding">
                <div className="container">
                    <div className="shop__content">
                        {/* <button>Open filter sidebar</button> */}
                        <Products />
                    </div>

                </div>
            </section>



        </Layout>
    )
}



export default AllProducts


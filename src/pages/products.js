import React, { useState } from 'react'
import Layout from '../components/layout/layout';
import StyledProductCard from '../components/styledProductCard/styledProductCard';
import products from '../constants/products';
import { graphql, useStaticQuery } from "gatsby";
import categories from '../constants/categories';
import BackgroundImage from 'gatsby-background-image';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';





export const query = graphql`
  {
    allStrapiProducts {
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

    file(relativePath: {eq: "washing-hands.jpeg"}) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
    }
  }
`


const AllProducts = ({ data }) => {

    const [categoriesDropdown, setCategoriesDropdown] = useState(false);
    const allProducts = data.allStrapiProducts.nodes;

    const Products = () => {
        return (
            <div className="products">
                {allProducts.map(product =>
                    <StyledProductCard
                        key={product.id}
                        type="product"
                        link={`/products/${product.slug}`}
                        title={product.title}
                        price={product.price}
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
                    fluid={data.file.childImageSharp.fluid}
                    preserveStackingContext={true}
                    className='shop__jumbotron'>
                    <div className="shop__jumbotron-content">
                        <div className="container">
                            <p className="shop__breadcrumb-list">Home / Categories / Shop</p>
                            <h1 className="shop__jumbotron-title">Shop</h1>
                            <button onClick={toggleCategoriesDropdown} className="shop__jumbotron-categories-btn">
                                <span className="shop__jumbotron-categories-btn__text">Categories</span>
                                <span className="shop__jumbotron-categories-btn__arrow">
                                    {categoriesDropdown ? <IoIosArrowDown /> : <IoIosArrowUp />}
                                </span>
                            </button>
                            {categoriesDropdown && <ul className="shop__jumbotron-categories-list">
                                {categories.map(category =>
                                    <li><a className="shop__jumbotron-categories-item" href="#">{category.title}</a></li>)}
                            </ul>}
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


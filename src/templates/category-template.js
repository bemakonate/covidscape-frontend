import React, { useState } from 'react'
import Layout from '../components/layout/layout';
import StyledProductCard from '../components/reusable/styledProductCard';
import { graphql, Link } from "gatsby";
import BackgroundImage from 'gatsby-background-image';
import { BsArrowLeft } from 'react-icons/bs';
import SEO from '../components/reusable/SEO';


export const query = graphql`
query GetCategory($slug: String){
    category: strapiCategories(slug: {eq: $slug}) {
        name
        products{
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
    const allProducts = data.category.products;
    const bgImage = data.category.image.childImageSharp.fluid;
    const category = data.category;


    const Products = () => {
        return (
            <div className="products">
                {allProducts.map(product =>
                    <StyledProductCard
                        key={product.id}
                        product={product}
                        type="product"
                        title={product.title}
                        price={product.price}
                        link={`/products/${product.slug}`}
                        image={product.image} />
                )}
            </div>
        )
    }
    const toggleCategoriesDropdown = () => setCategoriesDropdown(!categoriesDropdown);

    return (
        <Layout>
            <SEO title={category.name} />
            <header className={`header-height ${categoriesDropdown ? 'categories-dropdown' : null}`}>
                <BackgroundImage
                    Tag="div"
                    fluid={bgImage}
                    preserveStackingContext={true}
                    className='shop__jumbotron'>
                    <div className="shop__jumbotron-content">
                        <div className="container">
                            <div className="jumbo__sub-content">
                                <Link to="/products" className="jumbo__back-arrow"><BsArrowLeft /></Link>
                                <p className="shop__breadcrumb-list">
                                    <Link to="/">Home</Link> / <Link to="/categories">Categories</Link> / {category.name}
                                </p>
                                <h1 className="shop__jumbotron-title">{category.name}</h1>
                            </div>

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


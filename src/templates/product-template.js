import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/layout';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import { graphql } from "gatsby";
import GatsbyImage from 'gatsby-image';
import AspectRatio from '../components/aspectRatio/aspectRatio';
import { FiCheckCircle } from 'react-icons/fi';
import ItemQuantity from '../components/itemQuantity/itemQuantity';

export const query = graphql`
query GetProduct($slug: String){
    product: strapiProducts(slug: {eq: $slug}) {
      title
      id
      price
      description
      slug
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

const Product = ({ data: { product }, ...props }) => {
    const { title, price, description, image } = product;


    const [itemQuantity, setItemQuantity] = useState(1);
    const [addingToCart, setAddingToCart] = useState(false);
    const [cartText, setCartText] = useState(null);


    //If the page is adding a product change the content, and functionality
    useEffect(() => {
        if (addingToCart) {
            setCartText(<FiCheckCircle />);
        }
        else {
            setCartText("Add To Cart")
        }
    }, [addingToCart]);





    const addToCart = (product, quantity) => {
        setAddingToCart(true);
        props.onAddToCart(product, quantity);
        props.onOpenCartSidebar();
        setTimeout(() => setAddingToCart(false), 2000)
    };


    return (
        <Layout>
            <main className="product-page">
                <div className="product-page-container">
                    <div className="product-info">
                        <div className="single-product__photos">
                            <AspectRatio height="125%">
                                <GatsbyImage fluid={image.childImageSharp.fluid} className="single-product__main-photo" />
                            </AspectRatio>
                        </div>

                        <div className="single-product__content">
                            <div className="single-product__content-container">
                                <h2 className="single-product__title">{title}</h2>
                                <p className="single-product__price"><span className="single-product__dollar-sign">$</span>{price}</p>

                                <p className="single-product__description">{description}</p>
                                <ItemQuantity
                                    expand
                                    num={itemQuantity}
                                    getQuantity={setItemQuantity}
                                    styleClass="single-product__item-quantity" />

                                <button
                                    className={`cart-btn ${addingToCart ? 'active' : ''}`}
                                    onClick={() => addToCart(product, itemQuantity)}>{cartText}</button>
                            </div>
                        </div>
                    </div>


                </div>
            </main>

        </Layout>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onAddToCart: (item, quantity) => dispatch(actions.addToCart(item, quantity)),
        onOpenCartSidebar: () => dispatch(actions.openCartSidebar()),
    }
}
export default connect(null, mapDispatchToProps)(Product)

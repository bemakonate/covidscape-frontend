import React from 'react'
import Layout from '../components/layout/layout';
import GatsbyImage from 'gatsby-image';

import BackgroundImage from 'gatsby-background-image';
import { graphql, useStaticQuery } from "gatsby";
import StyledProductCard from '../components/styledProductCard/styledProductCard';

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

    allStrapiProducts {
      nodes {
        title
        slug
        price
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }

    file(relativePath: {eq: "couple-walking.jpg"}) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
  }
`



const ContactBox = (props) => {
  return (
    <div className={`contact-box ${props.styleClass}`}>
      <div className="contact-box-container">
        <div className={`contact-box-overlay ${props.overlayClass}`}></div>
        <GatsbyImage
          fluid={props.bgImg}
          className="contact-box-img" />
        <div className="contact-box-content">
          {props.children}
        </div>
      </div>
    </div>
  )
}



const Index = ({ data }) => {
  const categories = data.allStrapiCategories.categories;
  const products = data.allStrapiProducts.nodes;
  const Hero = () => {
    return (
      <BackgroundImage
        Tag="header"
        fluid={data.file.childImageSharp.fluid}
        preserveStackingContext={true}
        className="home-jumbotron">

        <article className="container">
          <h2>Staying safe,<br />doesn't mean staying dry </h2>
          <a className="home-jumbotron__shop-link" href="#">Shop Now</a>
        </article>
      </BackgroundImage >
    )
  }

  const BusinessMsg = () => {
    return (
      <section className="business-msg section-padding">
        <div className="business-msg__container container">
          <h2 className="business-msg__title">Show your style,<br /> and protect others</h2>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo dicta velit, beatae laborum voluptatem, atque aperiam sequi repellat fugit sunt iusto mollitia nobis voluptas! Libero minima dolorum optio nostrum suscipit!</p>
          <button className="btn btn-lg btn-dark">View all our products</button>
        </div>
      </section>
    )
  }

  const Categories = () => {

    return (
      <section className="section-padding">
        <div className="container">
          <div className="products">
            {categories.map((category, index) => {
              const itemsSet = new Set(category.products.map(product => product.id));
              return <StyledProductCard
                key={category.id}
                type="category"
                link={`/categories/${category.slug}`}
                title={category.name}
                items={itemsSet.size}
                image={category.image.childImageSharp.fluid} />
            })}
          </div>
        </div>
      </section>
    )
  }

  const Products = () => {
    return (
      <section className="section-padding">
        <div className="container">
          <div className="products">
            {products.map((product, index) => {
              return <StyledProductCard
                key={`product-${index}`}
                type="product"
                link={`/products/${product.slug}`}
                title={product.title}
                price={product.price}
                image={product.image.childImageSharp.fluid} />
            })}
          </div>
        </div>
      </section>
    )
  }

  const ContentBoxs = () => {
    return (
      <section className="section-padding">
        <div className="contact-boxs">
          <ContactBox
            bgImg={data.file.childImageSharp.fluid}
            styleClass="store-location">
            <h3>Visit Us</h3>
            <ul className="contact-box-location-list">
              <li className="contact-box-location-item">Head Office</li>
              <li className="contact-box-location-item">16 Boulevard Saint-Germain</li>
              <li className="contact-box-location-item">75005 Paris</li>
            </ul>
            <a className="contact-box-link" href="#">Contact Us</a>
          </ContactBox>

          <ContactBox
            bgImg={data.file.childImageSharp.fluid}
            styleClass="store-media">
            <h3 className="contact-box-title">Follow Our Store Instagram</h3>
            <a className="contact-box-link" href="#">@covidscape</a>
          </ContactBox>
        </div>
      </section>
    )
  }


  return (
    <Layout>
      <div className="home">
        <Hero />
        <main>
          <BusinessMsg />
          <Categories />
          <Products />
          <ContentBoxs />
        </main>
      </div>
    </Layout>
  )
}



export default Index

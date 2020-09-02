import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { graphql, useStaticQuery } from "gatsby";
import * as  actions from '../../store/actions';

const query = graphql`
  {
    allStrapiProducts {
      nodes {
        id
        title
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
  }
`


const RootElmt = (props) => {
    const data = useStaticQuery(query);
    const currentProducts = data.allStrapiProducts.nodes;
    const { onGetUserCart } = props;

    useEffect(() => {
        console.log('App loaded');
        onGetUserCart(currentProducts);
    }, [])
    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    )
};


const mapStateToProps = state => {
    return {
        cart: state.cart,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetUserCart: (products) => dispatch(actions.getUserCart(products))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootElmt);
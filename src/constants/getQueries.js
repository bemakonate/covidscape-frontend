
import { graphql, useStaticQuery } from 'gatsby';

const query = graphql`
{
    file(relativePath: {eq: "couple-walking.jpg"}) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
    }
}
`;



export default query;

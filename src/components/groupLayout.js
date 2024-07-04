import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from './layout'
import SEO from './seo'

import {
  HeaderWrapper,
  LayoutWrapper,
  Content,
  PicturesWrapper,
  InfoWrapper,
  InfoLinks,
  ExternalLink,
  InternalLink,
} from '../elements'

export const groupQueryImg = graphql`
  fragment groupQueryImg on File {
    childImageSharp {
      fluid {
        ...GatsbyImageSharpFluid
      }
    }
  }
`

export const query = graphql`
  query GroupQuery($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        slug
        price
        imgOne {
          ...groupQueryImg
        }
        imgTwo {
          ...groupQueryImg
        }
        imgThree {
          ...groupQueryImg
        }
        imgFour {
          ...groupQueryImg
        }
      }
    }
  }
`

const GroupLayout = ({ data }) => {
  const {
    markdownRemark: { frontmatter, html },
  } = data
  const { title, price, imgOne, imgTwo, imgThree, imgFour } = frontmatter
  const images = [imgOne, imgTwo, imgThree, imgFour]

  return (
    <Layout>
      <SEO title={`${title}`} />

      <HeaderWrapper>
        <LayoutWrapper>
          <h1>{title}</h1>
          <p>{price}</p>
        </LayoutWrapper>
      </HeaderWrapper>

      <Content>
        <PicturesWrapper>
          {images.map((img, i) => (
            <Img
              fluid={img.childImageSharp.fluid}
              alt={`${title} Image`}
              key={i}
            />
          ))}
        </PicturesWrapper>

        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Content>

      <InfoWrapper>
        <InfoLinks>
          <InternalLink to="/groups">Torna all'elenco</InternalLink>
          <ExternalLink href="mailto:info@alcentrodelmondo.it">
            Richiedi informazioni
          </ExternalLink>
        </InfoLinks>
      </InfoWrapper>
    </Layout>
  )
}

GroupLayout.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      html: PropTypes.string.isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        imgOne: PropTypes.object.isRequired,
        imgTwo: PropTypes.object.isRequired,
        imgThree: PropTypes.object.isRequired,
        imgFour: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}

export default GroupLayout

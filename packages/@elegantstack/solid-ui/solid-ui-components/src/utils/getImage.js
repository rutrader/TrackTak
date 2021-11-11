export default (image, variant) =>
  image
    ? image.__typename
      ? image[`${image.__typename}${variant ? '_' + variant : ''}`]
      : image[variant]
    : null

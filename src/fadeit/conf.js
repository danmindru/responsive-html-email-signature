/*
 * NB: for images, if you pass in a relative path ('assets/logo.png'), they will be automatically embedded (base64). If you pass in a URL, it will stay as it is.
 */

module.exports = [
  {
    id: 'fadeit', // Will be appended to the built templates.
    signature: 'Yours truly,',
    name: 'Jane Whatsmyname',
    welcome: 'Hi there,',
    introParagraph: 'Thanks for writing up this email.<br/> We are delighted to reply with a responsive template.',
    contactMain: 'Call <a href="tel:81100200"><span>81100200</span></a> or email us at', // Wrap phone numbers like this to prevent iOS mail from making them blue.
    contactMail: 'info@fadeit.dk',
    contactSecondary: 'Anelystparken 31, DK-8381 Tilst, Aarhus',
    logoUrl: 'http://fadeit.dk/src/assets/img/brand/fadeit-logo.png',
    logoAlt: 'fadeit logo',
    website: 'http://fadeit.dk'
  }
]
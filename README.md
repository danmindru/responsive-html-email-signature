# Responsive HTML mail signatures
Responsive templates for mail signatures. <br/>

When you need some basic signatures that work on mobile.<br/>
...and your colleagues need them too.<br/>
...but you don't want to deal with tables and inline styles.


## Preview
Here's how the samples look:

![responsive emails-01](https://cloud.githubusercontent.com/assets/1515742/10591900/13889d32-76b9-11e5-8dc0-b89d80189e93.png)
![responsive emails-02](https://cloud.githubusercontent.com/assets/1515742/10591901/139c4954-76b9-11e5-80f7-5b0ccaf5af81.png)


## What does it do
- [x] config-based template generation
- [x] allows generating multiple templates (for your colleagues too!)
- [x] transforms linked (`<link>`) CSS into inline styles
- [x] embeds local `img[src]` into the template (base64).*
- [x] minifies the template
- [x] media queries for mail clients that support them
- [x] can build templates from multiple sources
- [x] watches HTML/CSS files for changes and re-builds


**Some mail clients don't support them, so an external URL might be a good idea.*


## Getting started
```
$ npm install
$ gulp
```

Take a look at `src/fadeit/` for an example. Copy / Paste, rename it and change `src/fadeit/conf.js` to suite your needs. Run `gulp` to build the templates (into `/dist`). The gulp task will watch HTML & CSS files by default.


## CSS Support
Remember, it's HTML mails, so you need to check a big-ass table to find out nothing's gonna work.
See [this](https://www.campaignmonitor.com/css/). To convert CSS files to inline styles [gulp-inline-css](https://www.npmjs.com/package/gulp-inline-css) is being used.


## TODO
- [ ] closing `inline-css` issue [#8](https://github.com/jonkemp/inline-css/issues/8#issuecomment-149025428) would greatly improve this repo
- [ ] preprocessor support (simplifies BEM)
- [ ] use github pages to show live demos
- [ ] fix all mail clients


## Usage with different e-mail clients

### Thunderbird
There are several Thunderbird plugins which can automatically insert signatures when composing e-mails. We recommend [SmartTemplate4](https://addons.mozilla.org/en-us/thunderbird/addon/smarttemplate4) as one of the options. It can use different templates for new e-mails, replies and forwarded e-mails.


### Apple Mail / OS X (oh boy)
- Open Mail.app and go to `Mail` -> `Preferences` -> `Signatures`
- Create a new signature and write some placeholder text (doesn't matter what it is, but you have to identify it later).
- Close Mail.app.
- Open terminal, then open the signature files using TextEdit (might be different for iCloud drive check the article below).
```
$ open -a TextEdit ~/Library/Mobile\ Documents/com~apple~mail/Data/V3/MailData/Signatures/ubiquitous_*.mailsignature
```
- Keep the file with the placeholder open, close the other ones.
- Replace the `<body>...</body>` and it's contents with the template of your choice. *Don't remove the meta information at the top!*
- Open Mail.app and compose a new mail. Select the signature from the list to test it out.

**NB**: Images won't appear in the signature preview, but will work fine when you compose a message.




You can also open the HTML files in `/dist` in a browser, CMD + A, CMD + C and then paste into the signature box. This won't copy the `<html>` part or the `<style>` part that includes media queries. Follow the guide if you want it.


If you are using iCloud drive or having problems with it, you might also want to check [http://matt.coneybeare.me/how-to-make-an-html-signature-in-apple-mail-for-el-capitan-os-x-10-dot-11/](this article).


===================
<br/>
<a href="http:fadeit.dk"><img src="http://fadeit.dk/src/assets/img/brand/fadeit_logo_full.svg" alt="The fadeit logo" style="width:200px;"/></a><br/><br/>

####About fadeit
We love and are really good at designing &amp; developing beautiful software, web and mobile applications.

See more at [fadeit.dk](http://fadeit.dk)

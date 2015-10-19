# Responsive HTML email signatures
Responsive templates for email signatures. <br/>
**Disclaimer**: super basic layout, but there's nothing basic about HTML emails.

When you need some basic signatures that work on mobile.<br/>
...and your colleagues need them too.<br/>
...but you don't want to deal with tables and inline styles.


## Preview
Here's how the samples look:

![Fadeit desktop](http://danmind.ru/img/fadeit-desktop.png) <br/>
![Fadeit mobile](http://danmind.ru/img/fadeit-mobile.png)

![Play desktop](http://danmind.ru/img/play-desktop.png) <br/>
![Play mobile](http://danmind.ru/img/play-mobile.png)


## What does it do (checklist)
- [x] config-based template generation
- [x] allows generating multiple templates (for your colleagues too!)
- [x] transforms linked (`<link>`) CSS into inline styles
- [x] embeds local `img[src]` into the template (base64).*
- [x] minifies the template
- [x] media queries for email clients that support them
- [x] can build templates from multiple sources
- [x] watches HTML/CSS files for changes and re-builds

<small>** *Some email clients don't support them, so an external URL might be a good idea. **</small>


## Getting started
Take a look at `src/fadeit/` for an example. Copy / Paste, rename it and change `src/fadeit/conf.js` to suite your needs. Run `gulp` to build the templates (into `/dist`). The gulp task will watch HTML & CSS files by default.

```
$ gulp
```


## CSS Support
Remember, it's HTML emails, so you need to check a big-ass table to find out nothing's gonna work.
See [this](https://www.campaignmonitor.com/css/). To convert CSS files to inline styles [gulp-inline-css](https://www.npmjs.com/package/gulp-inline-css) is being used.


## TODO
- [] closing `inline-css` issue [#8](https://github.com/jonkemp/inline-css/issues/8#issuecomment-149025428) would greatly improve this repo
- [] preprocessor support (simplifies BEM)
- [] use github pages to show live demos
- [] fix all email clients


## Usage with different e-mail clients

### Thunderbird
There are several Thunderbird plugins which can automatically insert signatures when composing e-mails. We recommend [SmartTemplate4](https://addons.mozilla.org/en-us/thunderbird/addon/smarttemplate4) as one of the options. It can use different templates for new e-mails, replies and forwarded e-mails.


### Apple Mail / OS X (oh boy)
1. Open Mail.app and go to `Mail` -> `Preferences` -> `Signatures`
2. Create a new signature and write some placeholder text (doesn't matter what it is, but you have to identify it later).
3. Close Mail.app.
4. Open terminal, then open the signature files using TextEdit (might be different for iCloud drive check the article below).
```
$ open -a TextEdit ~/Library/Mobile\ Documents/com~apple~mail/Data/V3/MailData/Signatures/ubiquitous_*.mailsignature`
```
5. Keep the file with the placeholder open, close the other ones.
6. Replace the `<body>...</body>` and it's contents with the template of your choice. *Don't remove the meta information at the top!*
7. Open Mail.app and compose a new mail. Select the signature from the list to test it out.

**NB**: Images won't appear in the signature preview, but will work fine when you compose a message.




You can also open the HTML files in `/dist` in a browser, CMD + A, CMD + C and then paste into the signature box. This won't copy the `<html>` part or the `<style>` part that includes media queries. Follow the guide if you want it.


If you are using iCloud drive or having problems with it, you might also want to check [http://matt.coneybeare.me/how-to-make-an-html-signature-in-apple-mail-for-el-capitan-os-x-10-dot-11/](this article).

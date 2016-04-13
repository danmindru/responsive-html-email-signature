# ONE스토어 반응형 이메일 서명 
## 왜 필요한가?
> ![enter image description here](https://lh3.googleusercontent.com/BzNweHa8hVXwlLmUierMRZjqdCHcTXV1H1XRBii--RzLBy-xnZ8PIREtFz9x_8Su_Ybw=s0 "IMG_1172.PNG")
> [이 사진은 주작 입니다. ]

최근에 업체랑 이야기를 하다보니 위와 같은 말을 들었다.  
그래서 이유를 확인해보니 **이메일의 서명**이 이미지 파일을 사용하다보니 거의 모든 이메일이 첨부파일이 있는 것으로 분류가 되고 있었습니다.

> ![enter image description here](https://lh3.googleusercontent.com/dA1R2hr5dBFIY-SDUrGN8h8JwXauOMM5uJzrEsDtU0HphqdmnVObd_0UJOEckF2Y-dZO=s0 "IMG_1174.PNG")


## fadeit 의 이메일 템플릿 엔진 활용
이미지를 파일을 tag로만 처리하면 해결되는 것이지만 조금 더 욕심을 내보려고 깃헙에서 fadeit 의 템플릿을 뽑아와서 수정을 했습니다. 

- [원본 레파지토리 확인하기](https://github.com/fadeit/responsive-html-email-signature)

### 제공하는 것 
- NODE JS (gulp) 기반의 이메일 템플릿 빌드 엔진
- 빌드 시, inline CSS HTML 파일을 자동 생성
- 이미지 파일을 그냥 html 코드로 넣어버림 (base64)
- media queries 지원 (메일 클라이언트 지원시)

> Overview
This diagram shows what happens to your templates.
![Responsive HTML email template/signatures diagram](http://fadeit.dk/posts/html-emails-and-email-signatures-how-hard-can-it-be/html-responsive-email-template-build-diagram.png)


### 샘플 파일 확인 
>![enter image description here](https://lh3.googleusercontent.com/-Y4PAWNMyBzQ/Vw3jt6UsGDI/AAAAAAAAeS0/vmqPMt9AMyEDZ5fZOyeyzGQlB5J9Okmdg/h300/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA+2016-04-13+%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE+3.13.10.png "스크린샷 2016-04-13 오후 3.13.10.png")![enter image description here](https://lh3.googleusercontent.com/-hZvXa0vMFzk/Vw3lhGXRkqI/AAAAAAAAeTM/OUsSQwEYb0oGHFGxUSz9Mi6u1hnvISCQg/h300/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA+2016-04-13+%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE+3.13.16.png "스크린샷 2016-04-13 오후 3.13.16.png")

>**Some mail clients don't support them, so an external URL might be a good idea.*


## 메일 클라이언트에 적용하는 법 

### 아웃룩 

### Apple Mail / OS X

#### Solution 1
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


####Solution 2
You can also open the HTML files in `/dist` in a browser, CMD + A, CMD + C and then paste into the signature box. This won't copy the `<html>` part or the `<style>` part that includes media queries. Follow the guide if you want it.



===================
<br/>
<a href="http:fadeit.dk"><img src="http://fadeit.dk/src/assets/img/brand/fadeit_logo_full.svg" alt="The fadeit logo" style="width:200px;"/></a><br/><br/>

####Powered by  fadeit
See more at [fadeit.dk](http://fadeit.dk)
const puppeteer = require('puppeteer')

const codeObj = require('./codes')

const loginLink = 'https://www.hackerrank.com/auth/login'
const email = 'viripe2863@hapremx.com'
const password = '123pass@'


let browserOpen = puppeteer.launch({
    headless : false , 
    args : ['--start-maximized'] ,
    defaultViewport : null
})

let page

browserOpen.then(function(browserObj){
    let browserOpenPromise = browserObj.newPage();
    return browserOpenPromise;
}).then(function(newTab){
    page = newTab
    let hackerrankOpenPromise = newTab.goto(loginLink)
    return hackerrankOpenPromise
}).then(function(){

    let emailEntered = page.type("input[id='input-1']" , email , {delay: 50})
    return emailEntered
}).then(function(){

    let passwordEntered = page.type("input[id='input-2']" , password , {delay: 50})
    return passwordEntered
}).then(function(){

     let LoginButtonClicked = page.click('button[data-analytics="LoginPassword"]' , {delay : 50})
     return LoginButtonClicked
}).then(function(){

     let Algorithmpage = waitAndClick('.track-card a[data-attr2="algorithms"]' ,page)
     return Algorithmpage;
}).then(function(){

    let getTowarmup = waitAndClick('input[value="warmup"]' , page)
    return getTowarmup
}).then(function(){

      let waitFor3Seconds = page.waitFor(3000)
      return waitFor3Seconds
}).then(function(){

      let allChallengesPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled' , {delay : 50})
      return allChallengesPromise
}).then(function(questionArr){

      console.log('number of questions' , questionArr.length)
      let questionWillBeSolved = questionSolver(page , questionArr[1] , codeObj.answers[1])
      return questionWillBeSolved
})

function waitAndClick(selector , cPage){
    return new Promise(function(resolve , reject){
        let waitforModelPromise = cPage.waitForSelector(selector)
        waitforModelPromise.then(function(){
            let clickModel = cPage.click(selector)
            return clickModel
        }).then(function(){
            resolve()
        }).catch(function(err){
            reject()
        })
    })
}

function questionSolver(page , question , answer){

     return new Promise(function(resolve , reject){

          let questionWillBeClicked = question.click();
          questionWillBeClicked.then(function(){

               let textEditorFocus = waitAndClick('.monaco-editor.no-user-select.vs' , page)
               return textEditorFocus
          }).then(function(){
              return waitAndClick('.checkbox-input' , page)
          }).then(function(){

              return page.waitForSelector('textarea.custominput' , page)
          }).then(function(){

              return page.type('textarea.custominput' , answer , {delay : 10})
          }).then(function(){

              return page.keyboard.down('Control')
          }).then(function(){

            return page.keyboard.press('A')
          }).then(function(){
              return page.keyboard.press('C')
          }).then(function(){

               let textEditorFocus = waitAndClick('.monaco-editor.no-user-select.vs' , page)
               return textEditorFocus
          }).then(function(){

            return page.keyboard.press('A')
          }).then(function(){
            return page.keyboard.press('V')
          }).then(function(){

            return page.keyboard.up('Control')
          }).then(function(){

               let clickonSubmit = page.click('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled')
               return clickonSubmit
            })
     })

}
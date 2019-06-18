# ZyBooks Ultimate Hack

[![HitCount](http://hits.dwyl.io/kirillovmr/zybooks-hack.svg)](http://hits.dwyl.io/kirillovmr/zybooks-hack)

![ZyBooks logo](https://learn.zybooks.com/zycommon-web/assets/logo.svg "ZyBooks logo")

Because that [ZyBooks](https://www.zybooks.com/) uses its client part to check whether assignment is correct or no, I found an ability to intercept and modify outgoing requests. Therefore, all ZyBooks assignment (except those are checked manually) could be passed with this extension.


## Features

1. Press the extension icon to enable / disable requests interception.
2. Explicit notification to keep track of hacking progress.
3. Passing participation and challenge activities.


## Installation
This is a chrome extension, it is not published to Chrome WebStore, therefore you need to install it manually.

Download latest build:
  1. Download [latest build](https://github.com/kirillovmr/zybooks-hack/releases/download/1.0.0/zybooks-hack.zip).
  2. Extract on local machine.
  3. Go to **Chrome -> Extensions**. Make sure the **Developer Mode** is *ON*.
  4. Press **Load unpacked** -> Select the build folder on your machine with *manifest.json* file inside.

**OR**

Download project and compile:
  1. Download [this repo](https://github.com/kirillovmr/zybooks-hack/archive/master.zip).
  2. Extract on local machine.
  3. Open the terminal window in project directory and run:
```js
npm install
npm run build
```
  4. Go to **Chrome -> Extensions**. Make sure the **Developer Mode** is *ON*.
  5. Press **Load unpacked** -> Select the build folder on your machine with *manifest.json* file inside.


## Usage
When the extension is enabled, ZyBooks Hack is ready to intercept.
To pass Participation activities (multiple choice questions):
  1. **Select any answer or** if there is a button "show answer" - **press "show answer" twice**.
  2. **You will see the notification** about the progress.
  3. When the progress is done - **reload the page** to see the results.

To pass Challange activities (coding part):
  1. Press **Run** button.
  2. After standard tests passed, Hack will start and you will see the notification with its progress.
  3. When the progress is done - **reload the page** to see the results.

:bulb: Trick: You can proceed to the next question when the hack progress done without reloading the page. After all the activities, reload the page andd all of them will be passed.

## Warning
:bangbang: Project was made for test purposes only in order to advance website and network security.
All actions you take at your own risk. The author is not responsible for the consequences of your actions.


## Contributing

1. **Please!! Do not create a pull request without an issue before discussing the problem.**
2. On your PR make sure that you are following the current codebase style.
3. Your PR must be single purpose. Resolve just one problem on your PR.
4. Make sure to commit in the same style that we are committing until now on the project.

-------------
Viktor Kirillov ~ [@kirillovmr](https://github.com/kirillovmr)

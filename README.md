# find-a-coach-vuejs-firebase
Running my Code If you want to run this code, you need to follow these steps:

1. You must install nodejs from https://nodejs.org/en/
2. Run "npm install" in the extracted project folder to install all required dependencies => This will create a node_modules folder which is missing
3. Run "npm run serve" to bring up the development server, view the app at localhost:8080 (or whichever port is shown in your terminal)
🤞🏼🤞🏼#Run "npm run lint" Lints and fixes files

### ⚙️ Firebase Realtime Database rules ⚙️
```

{
  "rules": {
    "coaches":{
      ".read": true,
      ".write": "auth != null"
    },
    "requests":{
      ".read": "auth != null",
      ".write": true
    },
    //".read": "now < 1653001200000",  // 2022-5-20
    //".write": "now < 1653001200000",  // 2022-5-20
  }
}
```

### You must activate firebase authentication from your account dashboard - Provider (Email/Password)
```
https://firebase.google.com/docs/reference/rest/auth
```

<img src="https://repository-images.githubusercontent.com/482132881/f14d360e-f0b2-4f4d-923f-a652b003d62f"/>


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

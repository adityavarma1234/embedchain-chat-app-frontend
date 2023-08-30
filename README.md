# embedchain-chat-app-frontend
Embedchain-chatapp-frontend

## Install dependencies
```
npm install
```

## Change server port 
```
// utils/axiosConfig.js
baseURL: 'http://localhost:5000'
```

## Run server
```
npm run dev
```

## CORS issues
* [Install moesif CORS extension](https://chrome.google.com/webstore/detail/moesif-orign-cors-changer/digfbfaphojjndkpccljibejjbppifbc?hl=en-US)


### Current flow

After successfully uploading a file redirects to /chat where user can ask questions about the file uploaded.

![Success image](https://github.com/adityavarma1234/embedchain-chat-app-frontend/blob/main/success.png)
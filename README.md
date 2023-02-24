# AWS Cognito SSO self serve

## Introduction

This project serves as a template for anyone wanting to add a self service interface for configuring SSO with AWS Cognito to their application. This project is targeting apps with multi tenant AWS architecture.

## Features

- UI built with Vue js
 - Ability to configure, update, remove Identity providers
 - Ability to view users in a userpool
- CDK template for deploying infrastructure for tenant onboarding

## Architecture
Will continute to update this. First starting with the UI and the related infrastructure.

<img width="942" alt="Screen Shot 2023-02-22 at 10 48 16 AM" src="https://user-images.githubusercontent.com/7748458/220733994-25338a4d-a952-4248-88bc-d229e0b45b8c.png">


## Deployment

 TBD

## UI

### User listings page

<img width="1470" alt="Screen Shot 2023-02-23 at 4 22 23 PM" src="https://user-images.githubusercontent.com/7748458/221062663-1f5030e0-dc73-4e03-8abc-0faf8b852863.png">

### User details page

<img width="1470" alt="Screen Shot 2023-02-23 at 4 22 37 PM" src="https://user-images.githubusercontent.com/7748458/221062674-ba7219ff-c236-43f3-af28-06dc85f10dd8.png">

## Local development
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

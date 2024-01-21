# Fuse Rating Calculator

A simple static site for advising on plug fuse ratings.

## How to run this locally

You'll need to serve the files locally for this project to work; for example if you have Python 3 installed you can run:

```
python3 -m http.server
```
Then the site will be accessible at http://localhost:8000

> Opening `index.html` directly will not work as the browser will not permit you to load the JavaScript files from the local machine as this violates Cross Origin Resource Sharing (CORS) policy

## How this site is published

This repository is configured to publish to GitHub pages https://fixing-factory.github.io/FuseRatingCalculator/ whenever code is pushed to the `main` branch (you can find this in the repository settings under `Pages`)
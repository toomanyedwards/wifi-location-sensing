# Convective Core Wifi Location Sensing Server

This is repo for the server component of the Convective Core Wifi Location Sensing application. The Convective Core Wifi Location Sensing application architecture is shown below.  The application consists of a Node.js server component and commodity wifi monitors running [OpenWrt](https://openwrt.org/). The wifi monitors forward signal strength information for mobile devices within range to the server. The server then uses [trilateration](https://en.wikipedia.org/wiki/Trilateration) to turn the signal information from multiple monitors into location information for the mobile device.

## System Architecture
![resources](https://docs.google.com/drawings/d/1uRyrJErABrvka3FO41T6eZQhlXT03WFtqRzuF8yKTb4/pub?w=1372&h=759)


## CI/CD Integration

[Shippable](https://app.shippable.com/) is leveraged to faciliate continuous deployment of this project. Commits to this repo trigger an integration build that creates a Docker image and deploys this image to Amazon ECR. Then, this image is deployed from Amazon ECR to Amazon ECS.

## Continuous Deployment Process

![resources](https://docs.google.com/drawings/d/1tZLhZ75RpplBfUc3xsZcaLu57CQApJy4QII0O_OKPRs/pub?w=1376&h=716)

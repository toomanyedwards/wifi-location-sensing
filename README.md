# Convective Core Wifi Location Sensing Server

This is repo for the server component of the Convective Core Wifi Location Sensing application. The Convective Core Wifi Location Sensing application architecture is shown below.  The application consists of a Node.js server component and commodity wifi monitors running OpenWrt. The wifi monitors forward signal strength information for mobile devices within range to the server. The server then uses trilateration to turn the signal information from multiple monitors into location information for the mobile device.

![resources](https://docs.google.com/drawings/d/1uRyrJErABrvka3FO41T6eZQhlXT03WFtqRzuF8yKTb4/pub?w=1372&h=759)



![resources](https://docs.google.com/drawings/d/1tZLhZ75RpplBfUc3xsZcaLu57CQApJy4QII0O_OKPRs/pub?w=1376&h=716)

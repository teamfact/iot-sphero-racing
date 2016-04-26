# Introduction

This is the client part of the showcase containing all the code running on the edge device.
This repository will be udpated according the current state of the blog post series.

#Pre-requisite

The complete source code is written in Node.js. To install the required modules just run the following line:

```
npm install
```
We had some issues installing the xbox-controller module and its dependencies on other Node.js versions than 0.12.9.
Please use this LTS version, if you experience the same problems.


#/examples

The `examples` dir contains some test files, which you use to verify that everythings is working.

## examples/race.js

Running this script enables you to drive a Sphero with an Xbox 360 controller.

![gampad](http://scn.sap.com/servlet/JiveServlet/showImage/38-140938-935275/Arbeitsfläche+2.jpg "Gamepad controls")

```
PORT=/your/port node examples/racing.js
```

## examples/sphero.js

This is a script to test, if you can connect to a Sphero.
To connect to a Sphero, you need an active Bluetooth connection.
On the commandline the port needs to be passed in as an ENV variable like this:

```
PORT=/your/port node examples/sphero.js
```
The port differs on Windows/OS X/Linux and for different Sphero versions. How you can find your port is being described in full detail in the [official Sphero SDK](https://github.com/orbotix/sphero.js).

If you successfully conntected to a Sphero, it will randomly roll around.

## examples/xbox_conroller.js

[official repository](https://github.com/andrew/node-xbox-controller)

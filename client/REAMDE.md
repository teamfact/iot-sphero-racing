# Introduction

This is the client part of the showcase containing all the code running on the edge device.
This repository will be udpated according to the current state of the blog post series.

#Pre-requisite

The complete source code is written in Node.js. To install the required modules just run the following line:

```
npm install
```
We had some issues installing the xbox-controller module and its dependencies on other Node.js versions than 0.12.9.
Please use this LTS version, if you experience the same problems.


#/examples

The `examples` dir contains some test files, which you can use to verify that everythings is working.

## examples/race.js

Running this script enables you to drive a Sphero with an Xbox 360 controller.
The button layout can be taken from the following image.

![gampad](http://www.teamfact.com/fileadmin/teamfact/images/blog/2016/controller.jpg "Gamepad controls")

You can run the script by entering the following line on the command prompt:

```
PORT=/your/port node examples/racing.js
```
For information on the port see the information below.

## examples/sphero.js

This is a script to test, if you can connect to a Sphero.
To connect to a Sphero, you need an active Bluetooth connection.
On the command line the port needs to be passed in as an ENV variable like this:

```
PORT=/your/port node examples/sphero.js
```
The port differs on Windows/OS X/Linux and for different Sphero versions. How you can find your port is being described in full detail in the [official Sphero SDK](https://github.com/orbotix/sphero.js).

If you successfully conntected to a Sphero, it will randomly roll around.

## examples/xbox_conroller.js

The Xbox controller is being used to control the Sphero.
You can find all the requirements in the the [official repository](https://github.com/andrew/node-xbox-controller) of the node module.
There is a test script available in the examples directory, which you can run like this:

```
PORT=/your/port node examples/xbox_controller.js
```



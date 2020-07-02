# Crownstone event listener

> Express application for routing Crownstone events to Google Assistant.

## Table of Contents (Optional)

-   [Installation](#installation)
-   [Features](#features)
-   [Documenation](#documentation)
-   [Copyrights](#copyrights)

---

## Installation

First clone this repository and install the npm packages by running

```shell
$ yarn install
```

or

```shell
npm install
```

Copy the contents of the example.env file and create a new file called ".env" in the root of the project. You should also need a Google service key key. Follow the steps in the [crownstone-lambda](https://github.com/oscaroox/crownstone-lambda#installation) repository. The service key should be called "google_service_key.json" and placed in the private folder.

You can now run the application by running the command

```shell
$ yarn dev
```

or

```shell
$ npm run dev
```

---

## Features

This project supports the following features:

-   Adding users to the event server
-   Removing users from the event server
-   Handles the switchstate update, ability change and crownstone created/deleted event.

## Documentation

---

## Copyrights

Copyrights belong to Crownstone and are provided under a noncontagious open-source license:

    Authors: Oscar Druiventak
    Creation date: 28 Jun, 2020
    Licensed: MIT
    Crownstone: https://crownstone.rocks
    Stationsplein 45 d1.118, 3013 AK Rotterdam, The Netherlands

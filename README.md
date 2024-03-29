# Release GenParker

A combo of **Releaf** and **GenParker**!

## Introduction

As part of [Beslogic's philanthropy goal](https://innoverpourlhumanite.org/pages/philanthropie), Beslogic, Canopeum, Genparker are working together to build a solution that will help our planet to be a better place. Releaf is a monitoring platform giving the state of trees within a special box of soil and future saplings. It will help individuals to grow their trees by giving the necessary information to ensure their growth. Once a sapling is ready to be planted, the individual can either plant the trees themselves or send it to a nursery and restart the process!

## How is it done

Individuals will be able to buy a box to grow trees. It will include GenParker hardware helping monitor the system once ready to start the tree plantation process.

## Rewards

While the plantation process is underway, the individual will unlock achievements for their support. At the end of the process, the individual will either plant the trees or offer them to a nursery.

## High level project interaction

[Figma](https://www.figma.com/file/8bow63vDBmSKpr6GEtVfag/Mobile-App?type=design&node-id=0-1&mode=design&t=b0mSSHYs8Rm6GgFG-0)
![image](https://github.com/BesLogic/releaf-genparker/assets/22083907/d4bd84b6-b32b-4b19-9dd0-443c5eda0831)

## Project Structure

```
Releaf/GenParker Project Structure
├───.github
│   └───workflows                       # Github Actions
├───.vscode                             # Editor settings
├───apps                                # All the apps
│   ├───gen-parker                      # GenParker application
│   │   ├───backend
│   │   │   └───platform
│   │   │       └───src
│   │   │           ├───controllers     # Logic for handling requests
│   │   │           └───routers         # Routes
│   │   └───hardware                    # Hardware related code
│   └───releaf                          # Releaf applications
│       ├───backend                     # Releaf backend code
│       └───mobile                      # Releaf mobile code
│
├───configs                             # Kubernetes configurations
│   └───genparker                       # GenParker configurations
│       ├───base
│       │   ├───network
│       │   └───platform
│       └───overlay
│           └───philantropy
│               └───configs
│                   ├───network
│                   └───platform
├───libs
│   └───shared-js                       # Cross platform javascript utilities
│       └───util
│           └───src
│               └───lib
│                   ├───clients         # Abstracted clients
│                   ├───exceptions      # Custom exceptions
│                   ├───fakers          # Fake data generators
│                   ├───util            # Utilities
│                   └───middleware      # Express middleware
└───tools                               # NX tooling
```

## Project setups

### Installation

To be able to run the project you will need the following things installed:

- Node
- NX Console (Plugin)
- Docker
- Dotnet (install from [installer](https://dotnet.microsoft.com/en-us/download/dotnet/thank-you/sdk-8.0.203-windows-x64-installer))
- TODO (Add with further decisions)

Before starting the project make sure to run the command `npm install` on the root folder.

### Startup

To start all the applications must be possible by simply using the command <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd> in VSCode. Alternatively, you can **Run Build Task** in VSCode.

## Support

This project is part of [Beslogic's Hackaton](https://innoverpourlhumanite.org/pages/philanthropie) a group dev will start building the app for a minimal viable product.
After, we will finalize it in the coming year with the help of anyone.

To support the project, feel free to take a task from [here](https://github.com/BesLogic/releaf-genparker/issues) and submit a PR whenever you feel it is done!
For any issues found in the project, don't hesitate to create an issue with a description.

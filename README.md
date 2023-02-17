<div align="center">
  <a href="#">
    <img alt="Shahnawaz Hossan" src="./assets/educate.png" />
  </a>
  <h1>Henna Tale</h1>
</div>

## Table of Contents
* [Description](#description)
* [Used Technologies](#used-technologies)
* [Used Awesome Things](#used-awesome-things)
* [Install and Run](#install-and-run)
* [Important commands](#important-commands)
* [Git commands](#git-commands)


### Description

This project is for henna design

<br>

### Used Technologies

- [**nodejs `v18.13.0`**][nodejs]
- **npm `v8.19.3`**
- **react**
- [**react native `v0.71.1`**](https://reactnative.dev/)

### Used Awesome Things

- [React native app intro slider](https://www.npmjs.com/package/react-native-app-intro-slider)
- [React native vector icons](https://www.npmjs.com/package/react-native-vector-icons)


### Install and Run

```sh
git clone https://github.com/JenishaSanjida/henna-tale.git
cd henna-tale
npm install
# Run this command in one terminal
npx react-native start
# Run this command in another terminal
npx react-native run-android
# Make sure you've opened at least one emulator or device connected
```

### Important commands

```sh
# to see the connected device list
adb devices
```

### Git Commands

```sh
# Copy the repository into your local pc
git clone <repository_url>

# see project status whether you have any changes or not
git status

# see local branches
git branch

# see local and remote branches
git branch -a

# switch to a new branch
git checkout -b <branch_name>

# switch to an existing branch
git checkout <branch_name>

# stage all your changes
git add .

# commit your changes
git commit -m "your commit message"

# after pushing to your branch, switch to development branch and merge your branch with development branch
git checkout development
git merge jenisha
git push origin development
```

### Emulator things

- Open android-studio.

<!-- Definitions -->
[nodejs]: https://nodejs.org/en/
[reactjs]: https://reactjs.org/
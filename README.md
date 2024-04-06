<div align="center">
  <h1>Henna Tale</h1>
</div>

<br>

**This is the frontend of the following backend:** [https://github.com/JenishaSanjida/henna-server.git](https://github.com/JenishaSanjida/henna-server.git)

## Table of Contents
* [Description](#description)
  - [Designer's Flow](#designer-flow)
  - [Customer's Flow](#customer-flow)
* [Used Technologies](#used-technologies)
* [Used Awesome Things](#used-awesome-things)
* [Install and Run](#install-and-run)
* [Important commands](#important-commands)
* [Git commands](#git-commands)


### Description

#### Walkthrough Screens

Before reaching the login or registration page, users are guided through a series of walkthrough screens that introduce them to the app's journey and features.

| Walkthrough Screen 1 | Walkthrough Screen 2 | Walkthrough Screen 3 |
|:---:|:---:|:---:|
| <img src="screenshots/walkthrough/walkthrough-1.png" alt="Walkthrough Screen 1" width="200"> | <img src="screenshots/walkthrough/walkthrough-2.png" alt="Walkthrough Screen 2" width="200"> | <img src="screenshots/walkthrough/walkthrough-3.png" alt="Walkthrough Screen 3" width="200"> |

#### Designer Flow

**Designer App** is a platform where henna designers can showcase their designs, set their availability, and connect with customers.

| Users can register as a designers by providing their division, district, and thana, enabling customers to search for them based on these criteria. | Designers can log in to access their profiles and manage their designs and appointments. |
|:---:|:---:|
| <img src="screenshots/designer/1-registration-page.png" alt="Register as Designer" width="200"> | <img src="screenshots/designer/2-login-page.png" alt="Login as Designer" width="200"> |

| Home page with user list. Designers cannot book other designers as well as customers. That's why the "Book Appointment" buttons are disabled here. | Designers can browse through other designers' profiles, view their designs, and explore their portfolios. |
|:---:|:---:|
| <img src="screenshots/designer/3-home-page.png" alt="Home Page" width="200"> | <img src="screenshots/designer/4-designer-profile-from-designer.png" alt="View Designers Profiles" width="200"> |

| Designers can search for other designers based on their address, including division, district, and thana. | Designers can set their availability by specifying time slots based on their convenient timings. |
|:---:|:---:|
| <img src="screenshots/designer/4-search-page.png" alt="Search Another Designer" width="200"> | <img src="screenshots/designer/5-profile-page-1.png" alt="Set Availability" width="200"> |

| Selecting Day | Selecting Time |
|:---:|:---:|
| <img src="screenshots/designer/6-profile-page-2.png" alt="Selecting Day" width="200"> | <img src="screenshots/designer/7-profile-page-3.png" alt="Selecting Time" width="200"> |

| Deleting Time Slot | Designers can upload their henna designs to showcase their portfolio and capabilities. |
|:---:|:---:|
| <img src="screenshots/designer/8-profile-page-4.png" alt="Deleting Time Slot" width="200"> | <img src="screenshots/designer/9-profile-page-5.png" alt="Upload Portfolio Designs" width="200"> |

| Leftbar Menu | Designers can view their bookings with customers from the left sidebar, allowing them to manage their appointments effectively. |
|:---:|:---:|
| <img src="screenshots/designer/10-leftbar.png" alt="Leftbar" width="200"> | <img src="screenshots/designer/11-orders-from-leftbar.png" alt="View Bookings" width="200"> |

<br>

#### Customer Flow

**Customer App** is a platform where customers can search for nearby henna designers, view their profiles, and book appointments for henna services.

| Customers can register and log in to access the app's features and functionalities. | Customers can see all the designers here and book appointments. |
|:---:|:---:|
| <img src="screenshots/designer/1-registration-page.png" alt="Register and Login" width="200"> | <img src="screenshots/customer/1-home-page.png" alt="Home page" width="200"> |

| Customers can search for designers by divisions, district, and thana to find nearby designers. | Customers can view a designer's profile and explore their portfolio to choose a designer according to their design preferences. |
|:---:|:---:|
| <img src="screenshots/customer/1-search-page.png" alt="Search Designers" width="200"> | <img src="screenshots/customer/2-designer-profile-from-customer.png" alt="View Designer's Profile" width="200"> |

| Customers can book an appointment with a designer of their choice, selecting a date and viewing available time slots for that date. | Selected Time Slot |
|:---:|:---:|
| <img src="screenshots/customer/3-select-designer-for-availability.png" alt="Book Appointment" width="200"> | <img src="screenshots/customer/4-selected-timeslot.png" alt="Selected TimeSlot" width="200"> |

| Customers can provide their contact details while booking an appointment. The designer will contact the customer to provide home service at the specified time and location. | Leftbar for customers |
|:---:|:---:|
| <img src="screenshots/customer/5-confirmation-of-schedule-with-the-designer.png" alt="Provide Contact Details" width="200"> | <img src="screenshots/customer/6-leftbar.png" alt="Leftbar" width="200"> |

| Customers can view their bookings with designers, keeping track of their upcoming appointments. | App about page |
|:---:|:---:|
| <img src="screenshots/customer/7-booking-from-leftbar.png" alt="View Bookings" width="200"> | <img src="screenshots/customer/app-about-page.png" alt="App about page" width="200"> |

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

# pull from remote branch
git pull origin development
```

### Emulator things

- Open android-studio.

### Debug run

```sh
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

npx react-native run-android
```

<!-- Definitions -->
[nodejs]: https://nodejs.org/en/
[reactjs]: https://reactjs.org/
[reactnative]: https://reactnative.dev/

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

#### Designer Flow

**Designer App** is a platform where henna designers can showcase their designs, set their availability, and connect with customers.

##### Registration as a Designer

1. ![Register as Designer](screenshots/designer/1-registration-page.png)
   - **Description:** Users can register as a designer by providing their division, district, and thana, enabling customers to search for them based on these criteria.

##### Login as a Designer
2. ![Login as Designer](screenshots/designer/2-login-page.png)
   - **Description:** Designers can log in to access their profiles and manage their designs and appointments.

##### View Designers Profiles
3. ![View Designers Profiles](screenshots/designer/4-designer-profile-from-designer.png)
   - **Description:** Designers can browse through other designers' profiles, view their designs, and explore their portfolios.

##### Search Another Designer
4. ![Search Another Designer](screenshots/designer/4-search-page.png)
   - **Description:** Designers can search for other designers based on their address, including division, district, and thana.

##### Set Availability
5. ![Set Availability](screenshots/designer/5-profile-page-1.png)
   - **Description:** Designers can set their availability by specifying time slots based on their convenient timings.

##### Upload Portfolio Designs
6. ![Upload Portfolio Designs](screenshots/designer/9-profile-page-5.png)
   - **Description:** Designers can upload their henna designs to showcase their portfolio and capabilities.

##### View Bookings
7. ![View Bookings](screenshots/designer/11-orders-from-leftbar.png)
   - **Description:** Designers can view their bookings with customers from the left sidebar, allowing them to manage their appointments effectively.

<br>

#### Customer Flow

**Customer App** is a platform where customers can search for nearby henna designers, view their profiles, and book appointments for henna services.

##### Registration and Login
1. ![Register and Login](screenshots/customer/register_login_customer.png)
   - **Description:** Customers can register and login to access the app's features and functionalities.

##### Search Designers
2. ![Search Designers](screenshots/customer/1-search-page.png)
   - **Description:** Customers can search for designers by divisions, district, and thana to find nearby designers.

##### View Designer's Profile
3. ![View Designer's Profile](screenshots/customer/2-designer-profile-from-customer.png)
   - **Description:** Customers can view a designer's profile and explore their portfolio to choose a designer according to their design preferences.

##### Book Appointment
4. ![Book Appointment](screenshots/customer/3-select-designer-for-availability.png)
   - **Description:** Customers can book an appointment with a designer of their choice, selecting a date and viewing available time slots for that date.

##### Provide Contact Details
5. ![Provide Contact Details](screenshots/customer/5-confirmation-of-schedule-with-the-designer.png)
   - **Description:** Customers can provide their contact details while booking an appointment. The designer will contact the customer to provide home service at the specified time and location.

##### View Bookings
6. ![View Bookings](screenshots/customer/7-booking-from-leftbar.png)
   - **Description:** Customers can view their bookings with designers, keeping track of their upcoming appointments.

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

import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import AppIntroSlider from "react-native-app-intro-slider";
import styles from "./styles";
import walkthroughAppConfig from "../../constants/walkthroughAppConfig";
import Login from "../Login";

// import all the components we are going to use
import { SafeAreaView, View, Image, Text, Button, StatusBar } from "react-native";
//import AppIntroSlider to use it
import Icon from 'react-native-vector-icons/FontAwesome';
import MyDrawer from "../../components/DrawerNavigator";


const Walkthrough = () => {
  const [showRealApp, setShowRealApp] = useState(false);
  const [slides, setSlides] = useState(walkthroughAppConfig);

  useEffect(() => {
    StatusBar.setHidden(true);
  }, []);

  const onDone = () => {
    setShowRealApp(true);
  };

  const RenderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="arrow-right"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };

  const RenderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="check"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };

  const RenderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 100,
        }}>
        <Text style={styles.introTitleStyle}>
          {item.title}
        </Text>
        <Image
          style={styles.introImageStyle}
          source={item.image} />
        <Text style={styles.introTextStyle}>
          {item.text}
        </Text>
      </View>
    );
  };

  return (
    <>
      {showRealApp ? (
        // <MyDrawer />
        <Login />
        // <SafeAreaView style={styles.container}>
        //   <View style={styles.container}>
        //     <Text style={styles.titleStyle}>
        //       React Native App Intro Slider using AppIntroSlider
        //     </Text>
        //     <Text style={styles.paragraphStyle}>
        //       This will be your screen when you click Skip
        //       from any slide or Done button at last
        //     </Text>
        //     <Button
        //       title="Show Intro Slider again"
        //       onPress={() => setShowRealApp(false)}
        //     />
        //   </View>
        // </SafeAreaView>
      ) : (
        <AppIntroSlider
          data={slides}
          renderItem={RenderItem}
          onDone={onDone}
          renderDoneButton={RenderDoneButton}
          renderNextButton={RenderNextButton}
        />
      )}
    </>
  );
};

export default Walkthrough;
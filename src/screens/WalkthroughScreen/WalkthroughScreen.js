import React, { useState } from "react";

import PropTypes from "prop-types";
import AppIntroSlider from "react-native-app-intro-slider";
import styles from "./styles";
import WalkthroughAppConfig from "../../constants/WalkthroughAppConfig";
import LoginScreen from "../../components/screens/Login";

// import all the components we are going to use
import { SafeAreaView, View, Image, Text, Button } from "react-native";
//import AppIntroSlider to use it
import Icon from 'react-native-vector-icons/FontAwesome';


const WalkthroughScreen = () => {
  const [showRealApp, setShowRealApp] = useState(false);
  const [slides, setSlides] = useState(WalkthroughAppConfig);

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

        <LoginScreen />
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

export default WalkthroughScreen;

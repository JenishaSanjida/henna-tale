import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from './styles';
import { Image } from 'react-native-elements';

const Stack = createNativeStackNavigator();

const Activity = () => {
    return (
        <ScrollView style={styles.container}>

            <Text style={styles.heading}>Welcome to Henna Design</Text>

            <Text style={styles.subHeading}>Where Creativity Meets Convenience</Text>

            <View style={styles.feature}>
                <Text style={styles.featureText}>🎨 For Designers: Elevate Your Craft</Text>
                {/* Add designer-related content */}
                <Text>Become a part of our vibrant designer community by registering on the Henna Design app. As a designer, you have the power to shape your own schedule based on your availability, ensuring that you can passionately dedicate time to your henna artistry. Showcase your creativity by uploading your unique designs, sharing your artistic journey with the world. Whether it's traditional patterns or contemporary interpretations, your talent finds its home here.</Text>
            </View>

            <View style={styles.feature}>
                <Text style={styles.featureText}>🔍 For Customers: Your Perfect Design Awaits</Text>
                {/* Add customer-related content */}
                <Text>Customers, prepare to be amazed! Henna Design empowers you to explore a plethora of skilled designers based on your chosen location. The app's intuitive interface lets you browse through the portfolios of these talented artists, giving you a glimpse into their creative universe. When you find the design that resonates with your vision, the power to book your desired designer is right at your fingertips.</Text>
            </View>

            <View style={styles.feature}>
                <Text style={styles.featureText}>📚 A Journey through Art and Memories</Text>
                {/* Add order history and designer features */}
                <Text>Henna Design ensures that every user's journey is memorable. With a glance, you can access your comprehensive order history, reliving the stories behind each mesmerizing design you've chosen. As a designer, you have the freedom to curate your portfolio by adding new designs and removing previous ones, showcasing your growth and evolution as an artist.</Text>
            </View>

            <View style={styles.feature}>
                <Text style={styles.featureText}>🤝 Community Bonding and Exploration</Text>
                {/* Add community-related content */}
                <Text>Henna Design isn't just about transactions – it's about connections. Designers can immerse themselves in a supportive network by exploring other designers' profiles, gaining inspiration, and fostering collaborations. Customers, too, can see other users, broadening their perspective on the rich world of henna artistry.</Text>
            </View>


            <View style={styles.feature}>
                <Text style={styles.featureText}>⭐ Your Canvas Awaits</Text>
                <Text>Join us on Henna Design, where artists and patrons come together to weave intricate tales through henna. Unleash your creativity, book your favorite designers, and adorn yourself with designs that tell your story. Embrace the elegance of henna, redefined for the digital age.</Text>
            </View>

            <TouchableOpacity style={styles.downloadButton}>
                <Text style={styles.buttonText}>Download Henna Design</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const ActivityScreenStack = () => {

    const navigation = useNavigation();

    const handleOpenDrawer = () => {
        navigation.openDrawer();
    };

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#fff',
                },
                headerTitleStyle: {
                    // fontFamily: 'Ubuntu-Bold',
                    color: '#000',
                },
                headerTitleAlign: 'center',
                headerLeft: () => (
                    <TouchableOpacity onPress={handleOpenDrawer} style={{ marginLeft: 10 }}>
                        <FontAwesome name="navicon" style={{ fontSize: 24 }} />
                    </TouchableOpacity>
                ),
                headerLeftContainerStyle: { marginLeft: 10 },
            }}>
            <Stack.Screen
                name="Activity"
                component={Activity}
                options={{ title: 'HennaTales' }}
            />
        </Stack.Navigator>
    );
};


export default ActivityScreenStack
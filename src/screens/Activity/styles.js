import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginBottom: 20,
        textAlign: "center"
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subHeading: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
    },
    feature: {
        marginBottom: 20,
    },
    featureText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    ctaText: {
        fontSize: 20,
        fontWeight: 'bold',
        // textAlign: 'center',
        marginTop: 30,
    },
    downloadButton: {
        backgroundColor: '#FFA500',
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 30
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
    },
});
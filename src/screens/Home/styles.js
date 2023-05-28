import { Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export const styles = {
    cardContainer: {
        padding: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    picture: {
        width: width - 20,
        height: 200, // Adjust the height as needed
        marginBottom: 10,
        borderRadius: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        backgroundColor: '#2c3e50',
        borderRadius: 5,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonIcon: {
        marginRight: 5,
        marginLeft: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginLeft: 5,
        marginRight: 10,
    },
    separator: {
        height: 1,
        backgroundColor: '#E0E0E0',
    },
    loadingContainer: {
        paddingVertical: 10,
    },
};
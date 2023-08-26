const { StyleSheet } = require("react-native");

export const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        position: 'relative',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    closeButton: {
        position: 'absolute',
        right: 10,
        top: 5
    },
    modalHeaderText: {
        marginTop: -10,
        marginBottom: 10,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    orderDetailText: {
        fontSize: 16,
        marginBottom: 5,
    },
    listItemContainer: {
        backgroundColor: '#d0e0e3',
    },
    title: {
        fontFamily: 'Ubuntu-Bold',
        color: '#000',
    },
    subtitle: {
        color: 'gray',
        fontFamily: 'Ubuntu-Medium',
    },
    badge: {
        paddingHorizontal: 5,
        paddingVertical: 0,
        borderRadius: 20,
        marginRight: -30
    },
    badgeText: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});
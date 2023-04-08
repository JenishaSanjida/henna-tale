import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatarContainer: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 14,
        fontFamily: 'Ubuntu-Bold',
    },
    caption: {
        fontSize: 12,
        fontFamily: 'Ubuntu-Bold',
    },
    section: {
        marginTop: 30, /** For IOS only, for android is 30 */
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 16,
        marginBottom: 10,
        fontFamily: 'Ubuntu-Bold',
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 16,
        fontFamily: 'Ubuntu-Bold',
        alignSelf: 'center',
    },
    listItemInnerContentView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const DesignerProfile = ({ route, navigation }) => {
    const { name, avatar } = route.params;

    navigation.setOptions({
        title: name
    });

    const user = {
        coverPhoto: 'https://st2.depositphotos.com/4238279/11747/i/600/depositphotos_117475622-stock-photo-dramatic-sunset-at-the-beach.jpg',
        avatar: avatar,
        name: name,
        address: '123 Main Street, City, Country',
        photos: [
            'https://picsum.photos/200/300?random',
            'https://picsum.photos/200/300?random',
            'https://picsum.photos/200/300?random',
            'https://picsum.photos/200/300?random',
            'https://picsum.photos/200/300?random',
            'https://picsum.photos/200/300?random',
            'https://picsum.photos/200/300?random',
            'https://picsum.photos/200/300?random'
        ],
        followers: 1000,
        following: 500,
    };

    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const maxVisiblePhotos = 6;

    const handleToggleShowAllPhotos = () => {
        setShowAllPhotos(!showAllPhotos);
    };

    const renderPhotoItem = ({ item }) => (
        <Image source={{ uri: item }} style={styles.photoItem} />
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.coverPhotoContainer}>
                <Image source={{ uri: user.coverPhoto }} style={styles.coverPhoto} />
                <View style={styles.avatarContainer}>
                    <Image source={{ uri: user.avatar }} style={styles.avatar} />
                </View>
            </View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.address}>{user.address}</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>{user.photos.length} Photos</Text>
                {/* <Text style={styles.infoText}>{user.followers} Followers</Text> */}
                {/* <Text style={styles.infoText}>{user.following} Following</Text> */}
            </View>
            <View style={styles.photoContainer}>
                <FlatList
                    data={showAllPhotos ? user.photos : user.photos.slice(0, maxVisiblePhotos)}
                    renderItem={renderPhotoItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={3}
                    contentContainerStyle={styles.photoGrid}
                    ListFooterComponent={() =>
                        user.photos.length > maxVisiblePhotos && (
                            <TouchableOpacity
                                style={styles.morePhotosButton}
                                onPress={handleToggleShowAllPhotos}
                            >
                                <Text style={styles.morePhotosButtonText}>
                                    {showAllPhotos ? 'Show Less' : 'Show More'}
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20,
    },
    coverPhotoContainer: {
        position: 'relative',
    },
    coverPhoto: {
        width: '100%',
        height: 200,
    },
    avatarContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 10
    },
    address: {
        fontSize: 16,
        marginBottom: 20,
        marginLeft: 10
    },
    infoContainer:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    infoText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    photoContainer: {
        marginTop: 20,
    },
    photoGrid: {
        paddingHorizontal: 10,
    },
    photoItem: {
        width: '32%',
        aspectRatio: 1,
        margin: 2,
        borderRadius: 8,
    },
    morePhotosButton: {
        backgroundColor: '#E0E0E0',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 10,
    },
    morePhotosButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#424242',
    },
});

export default DesignerProfile;

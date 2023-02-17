import React, {useState} from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Feather from "react-native-vector-icons/Feather"
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionic from "react-native-vector-icons/Ionicons"


const Post= () => {

     const postInfo = [
        {
            postTitle: 'mr shermon',
            postPersonImage: require('../../storage/images/henna01.jpg'),
            postImage: require('../../storage/images/henna02.jpg'),
            likes: 765,
            isliked: false
        }
     ]


  return (
    <View>
     {
        postInfo.map((data, index) => {
            const [like, setlike] = useState(data.isliked)
            
            return(
                <View key={index} style={{
                    paddingBottom: 10,
                    borderBottomColor: 'gray',
                    borderBottomWidth: 0.1
                }}>
                      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15,}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={data.postPersonImage} style={{
                                width: 40, 
                                height: 40, 
                                borderRadius: 100,
                             }}/>

                             <View style= {{paddingLeft: 5}}>
                                <Text style={{fontSize: 15, fontWeight: 'bold' }}>{data.postTitle}</Text>
                             </View>
                        </View>
                        <Feather name="more-vertical" style={{fontSize: 20}}/>
                      </View>
                    <View style={{
                        position:'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                         <Image source={data.postImage}
                         style={{width: '100%', height: 400}}
                         />

                    </View>
                    <View 
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 12,
                        paddingVertical: 15,
                }}>
                    <View style={{flexDirection: 'row', alignItems: 'center',}}>
                        <TouchableOpacity>
                            <AntDesign 
                            name={like ? 'heart' : 'hearto'} 
                            style={{
                                paddingRight: 10, 
                                fontSize: 20, 
                                color: like ? 'red' : 'black',
                            }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionic name="ios-chatbubble-outline"
                            style={{fontSize: 20, paddingRight: 10}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Feather name="navigation"
                            style={{fontSize: 20,}}
                            />
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
            ) 
        })
     }
     </View>
  );
};

export default Post
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal,

} from 'react-native';
import icons from '../constants/icons';
import styles from '../screens/styles';


export default function Tempul({ onPress,icon=icons.remover }) {
    return(
        <View style={{flexDirection: 'column', width: '100%'}}>
            <View style ={styles.tempul1}>
                <Text style={styles.texto}>Sua pulseira está cadastrada</Text>
            </View>
            <View style = {styles.tempul2}>
                <TouchableOpacity onPress={onPress}>
                    <View style={styles.tempulblock}>
                        <View style={styles.imgtempul}>
                            <Image source={icon} style={{width: 30, height: 30}} resizeMode='contain'/>
                        </View>
                        <Text style={styles.texto}>Bloquear pulseira</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
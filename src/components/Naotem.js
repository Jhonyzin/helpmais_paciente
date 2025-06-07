import React, { useState} from 'react';
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

export default function Naotem({isSupported,onPress}) {
  const [visible, setvisible] = useState(false);
  const textonfc =
    'Que pena! Seu dispositivo não tem suporte com NFC mas você ainda pode utilizar outro dispositivo que tenha suport NFC.'

  return (
    <View>
      <TouchableOpacity>
        <View style={styles.pedir}>
          <View style={{marginTop: 10}}>
            <Image
              source={icons.iconpulseiranfc}
              style={{width: 100, height: 100}}
            />
          </View>
          <View style={{flexDirection: 'column', flexShrink: 1, marginTop: 10}}>
            <Text style={{fontSize: 20, color: '#FFF'}}>Peça sua pulseira</Text>
            <Text style={styles.texto}>
              Aqui você poderá solicitar sua pulseira
            </Text>
          </View>
        </View>
      </TouchableOpacity>

    
      {isSupported ? (
        <View style={{marginTop: 20}}>
          <Text style={{fontSize: 20}}>Já tem sua pulseira?</Text>

          <TouchableOpacity onPress={onPress}>
            <View style={styles.cadastrar}>
              <Image source={icons.iconpedir} style={{width: 55, height: 55}} />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#FFF',
                  marginLeft: 10,
                }}>
                Cadastrar pulseira
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TouchableOpacity
            onPress={() => setvisible(true)}
            style={{marginTop: 5, marginLeft: 5}}>
            <View style={{flexDirection: 'row', width: '100%', height: 50}}>
              <Text style={[styles.textocinza, {color: 'red', marginTop: 5}]}>
                Este dispositivo não suporta NFC.
              </Text>
              <Image
                source={icons.iconduvidas}
                style={{width: 20, height: 20}}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          <Modal transparent={true} visible={visible} animationType="fade">
            <TouchableWithoutFeedback onPress={() => setvisible(false)}>
              <View style={styles.modalnfc}>
                <View style={styles.modalnfc2}>
                  <View
                    style={{flexDirection: 'column', flexShrink: 1, gap: 13}}>
                    <Text style={styles.titlesmodal}>
                      Seu dispositivo não tem suporte NFC
                    </Text>
                    <Text style={{fontSize: 14, marginBottom: 15}}>
                      {textonfc}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.botaofechar}
                    onPress={() => setvisible(false)}>
                    <Text style={{fontSize: 16, fontWeight: 'bold', color: '#FFF'}}>
                      Fechar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      )}
    </View>
  );
}

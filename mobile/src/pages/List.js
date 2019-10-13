import React, { useState, useEffect } from 'react';
import { SafeAreaView, AsyncStorage, Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';
import { ScrollView } from 'react-native-gesture-handler';

export default function List({navigation}) {

    const [_id, setId] = useState('');
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storageTechs => {
            const techsArray = storageTechs.split(',').map(tech => tech.trim());
            setTechs(techsArray);
        })
    }, [])

    async function handleExit(){
        await AsyncStorage.removeItem('user');
        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headers}>
                <Image style={styles.logo} source={logo} />
                <TouchableOpacity onPress={handleExit} style={styles.button}>
                    <Text style={styles.buttonText}>Log Out</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headers: {
        marginTop: 35,
        marginBottom: 5,
    },
    container: {
        flex: 1,
    },
    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: "center",
    },

    button: {
        height: 32,
        flexWrap: 'wrap',
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
})
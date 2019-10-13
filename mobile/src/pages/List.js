import React, {useState, useEffect} from 'react';
import { SafeAreaView, AsyncStorage, Image, StyleSheet } from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';
import { ScrollView } from 'react-native-gesture-handler';

export default function List(){

    const [_id, setId] = useState('');
    const [techs, setTechs] = useState([]);

    useEffect(()=>{
        AsyncStorage.getItem('techs').then(storageTechs=>{
            const techsArray = storageTechs.split(',').map(tech => tech.trim());
            setTechs(techsArray);
        })
    },[])

    return (
    <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={logo}/>
        <ScrollView>
        {techs.map(tech => <SpotList key={tech} tech={tech}/>)}
        </ScrollView>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        height: 32,
        resizeMode: "contain",
        marginTop: 35,
        alignSelf: "center"
    }
})
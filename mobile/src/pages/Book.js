import React, { useState } from 'react';
import { SafeAreaView, AsyncStorage, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native';

export default function Book({ navigation }) {

    const id = navigation.getParam('id');

    const [date, setDate] = useState('');

    function handleSubmit(){

    }

    function handleCancel(){

    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>DATA DE INTERESSE</Text>
            <TextInput
                style={styles.input}
                placeholder="Qual data você quer reservar?"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Solicitar Reserva</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                <Text style={styles.buttonTextCancel}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop: 30,
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
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
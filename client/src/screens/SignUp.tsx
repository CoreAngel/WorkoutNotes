import React, {FC, ReactElement, useState} from "react";
import {View, StyleSheet, Text, TouchableOpacity, ActivityIndicator} from "react-native";
import {Card, Button, Input} from "react-native-elements";

import { Colors } from '../utils/Colors'
import {NavigationSwitchProp} from "react-navigation";


export const SignUp: FC<{navigation: NavigationSwitchProp<{screen: string}>}> = ({navigation}): ReactElement => {

    const [loader, setLoader] = useState(false);

    return (
        <View style={styles.container}>
            <Card>
                <Input
                    containerStyle={styles.input}
                    placeholder="Name..."
                    label='Name'
                />
                <Input
                    containerStyle={styles.input}
                    placeholder="Enter email"
                    label='Email'
                />
                <Input
                    containerStyle={styles.input}
                    secureTextEntry
                    placeholder="Password..."
                    label='Password'
                />
                {loader ? <ActivityIndicator size="large" color={Colors.PRIMARY}/> :
                    <View>
                        <Button
                            buttonStyle={styles.button}
                            title='SIGN UP'
                            onPress={() => setLoader(!loader)}
                        />
                        <Text style={styles.divider}>or</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('signIn')}>
                            <Text style={styles.text}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                }

            </Card>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
    },
    input: {
        marginBottom: 30
    },
    divider: {
        textAlign: 'center',
        color: '#626262',
        marginVertical: 10,
    },
    text: {
        textAlign: 'center',
        color: Colors.PRIMARY,
    },
    button: {
        backgroundColor: Colors.PRIMARY
    }
});
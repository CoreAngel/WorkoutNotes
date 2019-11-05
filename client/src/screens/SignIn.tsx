import React, {FC, useState} from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import {Card, Button, Input} from "react-native-elements";

import {COLORS} from '../utils/colors'
import {NavigationSwitchProp} from "react-navigation";


export const SignIn: FC<{navigation: NavigationSwitchProp<{screen: string}>}> = ({navigation}) => {

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
                    secureTextEntry
                    placeholder="Password..."
                    label='Password'
                />
                {loader ? <ActivityIndicator size="large" color={COLORS.PRIMARY}/> :
                    <View>
                        <Button
                            buttonStyle={styles.button}
                            title='SIGN IN'
                            onPress={() => setLoader(!loader)}
                        />
                        <Text style={styles.divider}>or</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('signUp')}>
                            <Text style={styles.text}>Sign Up</Text>
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
        color: COLORS.PRIMARY,
    },
    button: {
        backgroundColor: COLORS.PRIMARY
    }
});

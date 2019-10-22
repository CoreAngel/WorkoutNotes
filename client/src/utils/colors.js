import {colors} from "react-native-elements";
import {Platform} from "react-native";

const platformColor = Platform.select({
    android: colors.platform.android,
    ios: colors.platform.ios,
});

export default {
    primary: colors.primary,
    secondary: colors.secondary,
    grey0: colors.grey0,
    grey1: colors.grey1,
    grey2: colors.grey2,
    grey3: colors.grey3,
    grey4: colors.grey4,
    grey5: colors.grey5,
    greyOutline: colors.greyOutline,
    searchBg: colors.searchBg,
    success: colors.success,
    error: colors.error,
    ...platformColor,
}

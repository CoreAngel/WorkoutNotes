import React, {FC} from "react";
import {createAppContainer} from "react-navigation";
import { DrawerNavigation } from './DrawerNavigation'

const NavigationContainer = createAppContainer(DrawerNavigation);

export const Navigation:FC = () => <NavigationContainer/>;

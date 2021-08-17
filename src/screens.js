import * as React from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { enableScreens } from 'react-native-screens'

import { Platform } from 'react-native'
import Auth from './Screens/Auth/Auth-redux'
import Home from './Screens/Home/Home-Redux'
import Profile from './Screens/Profile/Profile-Redux'
import Todo from './Screens/Todo/Todo-Redux'
import Habit from './Screens/Habit/Habit-Redux'

import { BOTTOM_TABS, NAVIGATIONS } from './utils/navigationConstant'
import { useTheme } from './Theme/ThemeProvider'
import TabBarButton from './UI/TabBarButton'
import { normalize } from './Theme'
import CreateTodo from './Components/Todo/CreateTodo'
import DateTimePicker from './Components/Todo/DateTimePicker'
import CreateHabit from './Components/Habits/CreateHabit'
import ArchivedHabits from './Components/Habits/ArchivedHabits'

enableScreens()
const AuthStack = createNativeStackNavigator()
const AppStack = createNativeStackNavigator()
const DashboardStack = createNativeStackNavigator()
const TodoStack = createNativeStackNavigator()
const HabitStack = createNativeStackNavigator()
// const ProfileStack = createNativeStackNavigator()

const Tab = createBottomTabNavigator()

function HomeTabs() {
  const { theme } = useTheme()

  return (
    <Tab.Navigator
      screenOptions={props => ({
        contentStyle: { backgroundColor: 'transparent' },
        tabBarButton: buttonProps => (
          <TabBarButton
            {... buttonProps}
            navigation={props.navigation}
            route={props.route}
          />
        ),
      })}
      tabBarOptions={{
        showLabel: false,
        keyboardHidesTabBar: true,
        style: {
          borderTopWidth: 0,
          backgroundColor: theme.bgPrimary,
          paddingHorizontal: normalize(10),
          ...Platform.select({
            ios: {
            },
            android: {
              paddingVertical: normalize(10),
              height: normalize(55),
            },
          }),
        },
      }}
      initialRouteName={BOTTOM_TABS.TAB_DASHBOARD.id}

    >
      <Tab.Screen name={BOTTOM_TABS.TAB_DASHBOARD.id} component={DashboardTab} />
      <Tab.Screen name={BOTTOM_TABS.TAB_TODO.id} component={TodoTab} />
      <Tab.Screen name={BOTTOM_TABS.TAB_HABIT.id} component={HabitTab} />
      {/* <Tab.Screen name={BOTTOM_TABS.TAB_PROFILE.id} component={ProfileTab} /> */}
    </Tab.Navigator>
  )
}
export const AuthScreens = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={NAVIGATIONS.DASHBOARD.name}
    >
      <AuthStack.Screen name={NAVIGATIONS.AUTH.name} component={Auth} />
    </AuthStack.Navigator>
  )
}

export const DashboardTab = () => {
  return (
    <DashboardStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={NAVIGATIONS.DASHBOARD.name}
    >
      <DashboardStack.Screen name={NAVIGATIONS.DASHBOARD.name} component={Home} />

    </DashboardStack.Navigator>
  )
}

export const TodoTab = () => {
  return (
    <TodoStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={NAVIGATIONS.TODO.name}
    >
      <TodoStack.Screen name={NAVIGATIONS.TODO.name} component={Todo} />
    </TodoStack.Navigator>
  )
}

export const HabitTab = () => {
  return (
    <HabitStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={NAVIGATIONS.HABIT.name}
    >
      <HabitStack.Screen name={NAVIGATIONS.HABIT.name} component={Habit} />

    </HabitStack.Navigator>
  )
}

// export const ProfileTab = () => {
//   return (
//     <ProfileStack.Navigator
//       screenOptions={{ headerShown: false }}
//       initialRouteName={NAVIGATIONS.PROFILE.name}
//     >
//       <ProfileStack.Screen name={NAVIGATIONS.PROFILE.name} component={Profile} />
//     </ProfileStack.Navigator>
//   )
// }

export const AppScreens = () => {
  return (
    <AppStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={NAVIGATIONS.DASHBOARD.name}
    >
      <AppStack.Screen name={NAVIGATIONS.DASHBOARD.name} component={HomeTabs} />
      <AppStack.Screen name={NAVIGATIONS.CREATE_TODO.name} component={CreateTodo} />
      <AppStack.Screen name={NAVIGATIONS.DATE_TIME_PICKER.name} component={DateTimePicker} />
      <AppStack.Screen name={NAVIGATIONS.CREATE_HABIT.name} component={CreateHabit} />
      <AppStack.Screen name={NAVIGATIONS.ARCHIVED_HABITS.name} component={ArchivedHabits} />
      <AppStack.Screen name={NAVIGATIONS.PROFILE.name} component={Profile} />
    </AppStack.Navigator>
  )
}

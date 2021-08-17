import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Image, Platform, ScrollView, StyleSheet, Switch, View, Share, TouchableWithoutFeedback, Linking,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  ASSETS, COLORS, ICONS, normalize, shadowGenerator, SPACING,
} from '../../Theme'
import { withTheme } from '../../Theme/ThemeProvider'
import CustomText from '../../UI/CustomText'
import Icon from '../../UI/Icon'
import { LOCALSTORAGE_MAP, PROFILE_MENU_OPTIONS, THEME_TYPE_MAP } from '../../utils/consts'
import Button from '../../UI/Button'
import { showSnackbar } from '../../UI/Snackbar'
import ScreenHeader from '../../UI/ScreenHeader'

const { Profile2 } = ASSETS

function Profile(props) {
  const {
    styles, theme, isDark, toggleTheme, navigation,
  } = props

  const [changingTheme, updateChangingTheme] = useState(false)

  useEffect(() => {
    updateChangingTheme(false)
  }, [isDark])

  const onValueChange = () => {
    const changeTo = THEME_TYPE_MAP[isDark ? 'LIGHT' : 'DARK'].value
    updateChangingTheme(true)
    AsyncStorage.setItem(LOCALSTORAGE_MAP.THEME, changeTo)
    toggleTheme(changeTo)
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Happy Todo | An app for managinf your todos and habits.',
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      showSnackbar(error.message)
    }
  }

  const handleOptionSelect = (option) => {
    switch(option) {
      case PROFILE_MENU_OPTIONS.SHARE.id: {
        onShare()
        break
      }
      case PROFILE_MENU_OPTIONS.RATEUS.id: {
        Linking.openURL('itms-apps://apps.apple.com/in/app/instagram/id389801252')
        break
      }
      default: return null
    }
  }

  const renderToggleThemeOption = () => {
    return (
      <View style={{
        width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.SPACE_10,
      }}
      >
        <View style={styles.menuInfo}>
          <Icon name={ICONS.TOOGLE_THEME} color={COLORS[isDark ? 'WHITE' : 'CREATIVE_COLOR']} size={24} />
          <CustomText size="medium_1">{'   Dark Theme'}</CustomText>
        </View>
        {changingTheme ? (
          <ActivityIndicator size="small" />
        ) : (
          <Switch
            value={isDark}
            onValueChange={onValueChange}
            trackColor={theme.switchTrack}
            thumbColor={theme.switchThumb}
            ios_backgroundColor={COLORS.SCREEN_BG}
            {...Platform.select({
              ios: {
                style: styles.assistSwitchIos,
              },
              android: {
                style: styles.assistSwitch,
              },
            })}
          />
        )}
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ScreenHeader title="Profile" showBackBtn backPressHandler={() => navigation.goBack()} />

      <View style={{ alignItems: 'center' }}>
        <Image style={{ width: 150, height: 150, borderRadius: 100 }} source={Profile2} />
        <View style={{
          flexDirection: 'row', alignItems: 'center', marginVertical: SPACING.SPACE_10,
        }}
        >
          <CustomText size="xlarge" weight="bold">Mohit Kumar</CustomText>
          <Icon
            style={{ marginHorizontal: SPACING.SPACE_10, marginTop: normalize(5) }}
            name={ICONS.EDIT}
            color={theme.textPrimary}
            size={20}
          />
        </View>
        <CustomText center size="medium_1">moh_hit@icloud.com</CustomText>
      </View>

      <View style={styles.menuContainer}>
        {renderToggleThemeOption()}
        {Object.values(PROFILE_MENU_OPTIONS).map((option) => {
          return (
            <TouchableWithoutFeedback
              key={option.id}
              onPress={() => handleOptionSelect(option.id)}
            >
              <View style={styles.menuRow}>
                <View
                  style={{
                    backgroundColor: option.color,
                    padding: 8,
                    borderRadius: 100,
                    ...shadowGenerator({ elevation: 12 }),
                  }}
                >
                  <Icon
                    name={option.icon}
                    color={COLORS.GREY}
                    size={16}
                  />
                </View>

                <CustomText style={{ marginLeft: 15 }} weight="medium" size="medium">{option.label}</CustomText>
              </View>
            </TouchableWithoutFeedback>
          )
        })}
        <Button
          mode="outlined"
          labelColor={COLORS.CREATIVE_COLOR}
          roundness={12}
          uppercase
          containerStyle={{ height: normalize(50) }}
        >
          Logout
        </Button>
      </View>
    </ScrollView>
  )
}
const stylesheet = theme => StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: theme.bgPrimary,
  },
  menuContainer: {
    backgroundColor: theme.bgPrimary,
    paddingVertical: SPACING.SPACE_28,
    paddingHorizontal: SPACING.SPACE_20,
  },
  menuInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.SPACE_20,
  },
  assistSwitch: {
    marginLeft: SPACING.SPACE_6,
  },
  assistSwitchIos: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],

  },
})

export default withTheme(stylesheet)(Profile)

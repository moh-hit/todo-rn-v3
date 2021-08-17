import React, { useEffect } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import {
  COLORS, DIMENSIONS, normalize, ASSETS,
} from '../../Theme'
import { withTheme } from '../../Theme/ThemeProvider'
import CustomText from '../../UI/CustomText'
import Button from '../../UI/Button'
import { showSnackbar } from '../../UI/Snackbar'

const { LoginBanner, GoogleLogo, Logo } = ASSETS
function Auth(props) {
  const { styles, signIn } = props

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '148792951245-incmr26l7g413nai1fufttl22sjvj1og.apps.googleusercontent.com',
      offlineAccess: true,
    })
  }, [])

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const { idToken } = await GoogleSignin.signIn()
      signIn(idToken)
      showSnackbar('Signed in successfully.')
    } catch (error) {
      showSnackbar(error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={Logo} style={{ width: 50, height: 50 }} />
        <CustomText color={COLORS.BLACK} size="large_1" weight="bold">Happy Todo</CustomText>
      </View>
      <LoginBanner width="100%" height="250" style={{ alignSelf: 'center', transform: [{ rotate: '90deg' }] }} />

      <View style={{ alignItems: 'center' }}>

        <CustomText center color={COLORS.BLACK} size="large_3" weight="bold">Free up your mind</CustomText>
        <CustomText
          color={COLORS.BLACK_30}
          size="medium"
          center
        >
          Go mind-free all day with daily briefings and timely reminders.
        </CustomText>
      </View>

      <View>
        <Button
          mode="outlined"
          roundness={100}
          containerStyle={styles.buttonContainer}
          labelColor={COLORS.GOOGLE_BLUE}
          leftIconName={GoogleLogo}
          isLeftIconSvg
          onPress={_signIn}
        >
          Sign in with google
        </Button>
        <CustomText
          size="regular"
          weight="regular"
          color={COLORS.BLACK}
          style={{
            marginTop: normalize(20), marginHorizontal: DIMENSIONS.SPACE_HORIZONTAL, textAlign: 'center',
          }}
        >
          By continuing you agree to our
          {' '}
          <CustomText
            size="regular"
            color={COLORS.CREATIVE_COLOR}
            weight="regular"
            extraProps={{
              onPress: () => {
                //  this.setState({ showWebview: true, webviewUrl: termsAndCondsUrl })
              },
            }}
          >
            Terms and
            Conditions
          </CustomText>
        </CustomText>
      </View>
    </View>
  )
}

const stylesheet = () => StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
    paddingHorizontal: DIMENSIONS.SPACE_HORIZONTAL,
    justifyContent: 'space-around',
  },
  mobileInput: {
    borderWidth: 0.5,
    borderColor: COLORS.INPUT_BORDER,
    height: normalize(50),
  },
  mobileInputContainer: {
    marginVertical: DIMENSIONS.SPACE_VERTICAL,
  },
  buttonContainer: {
    height: normalize(50),

  },
})

export default withTheme(stylesheet)(Auth)

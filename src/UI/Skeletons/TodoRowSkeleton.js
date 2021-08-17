import React from 'react'
import { StyleSheet } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { DIMENSIONS, normalize, SPACING } from '../../Theme'
import { withTheme } from '../../Theme/ThemeProvider'

function TodoRowSkeleton(props) {
  const { theme } = props
  return (
    <SkeletonPlaceholder backgroundColor={theme.bgSecondary} highlightColor={theme.bgTertiary}>
      <SkeletonPlaceholder.Item
        paddingVertical={SPACING.SPACE_20}
        flexDirection="row"
        alignItems="center"
      >
        <SkeletonPlaceholder.Item
          width={40}
          height={40}
          borderRadius={50}
        />
        <SkeletonPlaceholder.Item marginLeft={20}>
          <SkeletonPlaceholder.Item
            width={DIMENSIONS.WIDTH - DIMENSIONS.SPACE_HORIZONTAL * 5}
            height={15}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            marginTop={6}
            width={normalize(50)}
            height={15}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  )
}
const stylesheet = theme => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgPrimary,
    justifyContent: 'center',

  },
})
export default withTheme(stylesheet)(TodoRowSkeleton)

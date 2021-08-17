import { COLORS, ICONS } from '../Theme'

export const NAVIGATIONS = {
  AUTH: {
    name: 'auth',
    id: 'AUTH',
  },
  DASHBOARD: {
    name: 'dashboard',
    id: 'DASHBOARD',
  },
  PROFILE: {
    name: 'profile',
    id: 'PROFILE',
  },
  TODO: {
    name: 'todo',
    id: 'TODO',
  },
  HABIT: {
    name: 'habit',
    id: 'HABIT',
  },
  CREATE_TODO: {
    name: 'createTodo',
    id: 'CREATE_TODO',
  },
  CREATE_HABIT: {
    name: 'createHabit',
    id: 'CREATE_HABIT',
  },
  DATE_TIME_PICKER: {
    name: 'dateTimePicker',
    id: 'DATE_TIME_PICKER',
  },
  ARCHIVED_HABITS: {
    name: 'archivedHabits',
    id: 'ARCHOVED_HABITS',
  },
}

export const BOTTOM_TABS = {
  TAB_DASHBOARD: {
    id: 'TAB_DASHBOARD',
    icon: ICONS.TAB_DASHBOARD,
    name: 'Home',
    color: COLORS.ORANGE,
    colorLight: COLORS.ORANGE_100,
  },
  TAB_TODO: {
    id: 'TAB_TODO',
    icon: ICONS.TAB_TODO,
    name: 'To do',
    color: COLORS.RED,
    colorLight: COLORS.RED_100,
  },
  TAB_HABIT: {
    id: 'TAB_HABIT',
    icon: ICONS.TAB_HABIT,
    name: 'Habits',
    color: COLORS.GREEN,
    colorLight: COLORS.GREEN_LIGHT,
  },
  TAB_PROFILE: {
    id: 'TAB_PROFILE',
    icon: ICONS.TAB_PROFILE,
    name: 'Profile',
    color: COLORS.BLUE,
    colorLight: COLORS.SHADOW_BLUE,
  },
}

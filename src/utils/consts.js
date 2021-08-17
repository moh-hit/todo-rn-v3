import { COLORS, ICONS } from '../Theme'
import { PALETTE_COLORS } from '../Theme/style_consts'

export const THEME_TYPE_MAP = {
  DARK: {
    label: 'Dark', value: 'DARK', iconSize: 13, iconColor: 'TEXT', optionSize: 'small',
  },
  LIGHT: {
    label: 'Light', value: 'LIGHT', iconSize: 13, iconColor: 'TEXT', optionSize: 'small',
  },
  AUTO: {
    label: 'Auto', value: 'AUTO', iconSize: 13, iconColor: 'TEXT', optionSize: 'small',
  },
}

export const ASYNCSTORAGE_MAP = {
  SHOW_ONBOARDING: 'SHOW_ONBOARDING',
  AUTH_TOKEN: 'AUTH_TOKEN',
}

export const HEADER_TYPE_MAP = {
  ALL: {
    label: 'All Tasks', id: 'ALL',
  },
  TODAY: {
    label: 'Today', id: 'TODAY',
  },
  UPCOMING: {
    label: 'Upcoming', id: 'UPCOMING',
  },
}

export const LOCALSTORAGE_MAP = {
  THEME: 'theme',
}

export const PROFILE_MENU_OPTIONS = {
  PRO: {
    id: 'PRO', label: 'Go Pro', icon: ICONS.UNLOCK, color: COLORS.CREATIVE_COLOR,
  },
  RATEUS: {
    id: 'RATEUS', label: 'Rate us 5 stars', icon: ICONS.STAR, color: COLORS.CATEGORY_YELLOW,
  },
  SHARE: {
    id: 'SHARE', label: 'Share it with your friend', icon: ICONS.SHARE, color: PALETTE_COLORS.BLUE,
  },
  FEEDBACK: {
    id: 'FEEDBACK', label: 'Give us your Feedback', icon: ICONS.HEART, color: COLORS.RED,
  },
}

export const CREATE_TODO_INPUT_MAP = {
  TODO_NAME: {
    label: 'Enter todo name', value: 'title', style: { fontSize: 16, fontWeight: 'bold' },
  },
  TODO_DESC: {
    label: 'Enter description for your todo', value: 'desc',
  },
}

export const CREATE_HABIT_INPUT_MAP = {
  TODO_NAME: {
    label: 'Enter habit name', value: 'name', style: { fontSize: 24 },
  },
  TODO_DESC: {
    label: 'Enter description for your habit', value: 'description',
  },
}

export const dateOptions = {
  weekday: 'short',
  day: 'numeric',
  year: 'numeric',
  month: 'long',
  hour: 'numeric',
  minute: 'numeric',
}

export const HR_MAP = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
export const MIN_MAP = ['05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60']
export const AMPPM_MAP = ['AM', 'PM']

export const HABIT_ROUTINE_MAP = {
  HOUR: { label: 'Every Hour', value: 'HOUR' },
  DAY: { label: 'Every Day', value: 'DAY' },
  WEEK: { label: 'Every Week', value: 'WEEK' },
  TWICEWEEK: { label: 'Every twice a week', value: 'TWICEWEEK' },
  MONTH: { label: 'Every Month', value: 'MONTH' },
  THRICEMONTH: { label: 'Every thrice a month', value: 'THRICEMONTH' },
}

export const SORT_TYPE_MAP = {
  ATOZ: {
    label: 'Sort by A-Z',
    id: 'az',
    key: 'ATOZ',
    iconSize: 18,
    iconColor: 'TEXT',
    optionSize: 'medium',
    icon: ICONS.ATOZ,
  },
  ZTOA: {
    label: 'Sort by Z-A',
    id: 'za',
    key: 'ZTOA',
    iconSize: 18,
    iconColor: 'TEXT',
    optionSize: 'medium',
    icon: ICONS.ZTOA,
  },
  LATEST: {
    label: 'Sort by recent task',
    id: 'latest',
    key: 'LATEST',
    iconSize: 18,
    iconColor: 'TEXT',
    optionSize: 'medium',
    icon: ICONS.LATEST,
  },
  OLDEST: {
    label: 'Sort by future tasks',
    id: 'oldest',
    key: 'OLDEST',
    iconSize: 18,
    iconColor: 'TEXT',
    optionSize: 'medium',
    icon: ICONS.OLDEST,
  },
  COMPLETED: {
    label: 'Sort by completed first',
    id: 'completed',
    key: 'COMPLETED',
    iconSize: 18,
    iconColor: 'TEXT',
    optionSize: 'medium',
    icon: ICONS.TICK,
  },
  PENDING: {
    label: 'Sort by pending first',
    id: 'pending',
    key: 'PENDING',
    iconSize: 18,
    iconColor: 'TEXT',
    optionSize: 'medium',
    icon: ICONS.UNTICK_SQUARE,
  },
}

import { HABIT_TODO_ICONS } from '../Theme/icons'
import { PALETTE_COLORS } from '../Theme/style_consts'

export const TODO_MAP = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Join conference meeting',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    done: true,
    time: (new Date()),
    tag: 'Work',
    color: PALETTE_COLORS.BLUE,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Go meet friends',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    done: true,
    time: (new Date()),
    tag: 'Personal',
    color: PALETTE_COLORS.BROWN,
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53asdbb28ba',
    title: 'Trip Plan',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    done: true,
    time: (new Date(new Date().getTime() + (25 * 24 * 60 * 60 * 1000))),
    tag: 'Personal',
    color: PALETTE_COLORS.GREEN,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8543',
    title: 'Go to Gym',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    done: false,
    time: (new Date(new Date().getTime() + (3 * 24 * 60 * 60 * 1000))),
    tag: 'Personal',
    color: PALETTE_COLORS.RED,
  },
  {
    id: 'bd7acbfer-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Shop for Bday',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    done: false,
    time: (new Date()),
    tag: 'Personal',
    color: PALETTE_COLORS.ORANGE,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd93dewa97f63',
    title: 'Watch Series',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    done: false,
    time: (new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000))),
    tag: 'Personal',
    color: PALETTE_COLORS.CREAM,
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53af43328ba',
    title: 'Complete Drawing',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    done: false,
    time: (new Date(new Date().getTime() + (9 * 8 * 24 * 60 * 60 * 1000))),
    tag: 'Work',
    color: PALETTE_COLORS.MAGENTA,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91f397f63',
    title: 'Cook something',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    done: true,
    time: (new Date(new Date().getTime() + (13 * 24 * 60 * 60 * 1000))),
    tag: 'Personal',
    color: PALETTE_COLORS.PURPLE,
  },
]

export const TAGS_MAP = [
  { name: 'All', color: PALETTE_COLORS.BLUE },
  { name: 'Today', color: PALETTE_COLORS.GREEN },
  { name: 'Upcoming', color: PALETTE_COLORS.ORANGE },
  { name: 'Trip', color: PALETTE_COLORS.PINK },
  { name: 'Work', color: PALETTE_COLORS.RED },
  { name: 'Personal', color: PALETTE_COLORS.PURPLE },
]

export const CAROUSEL_DATA_MAP = [
  {
    id: 1, title: 'Go to Gym', icon: HABIT_TODO_ICONS.HEADPHONE.id, completed: 7, outOf: 7, bgColor: 'PURPLE', code: 'Days', routine: 'DAY',
  },
  {
    id: 2, title: 'Read the novel', icon: HABIT_TODO_ICONS.BOOK_OPEN.id, completed: 78, outOf: 254, bgColor: 'RED', code: 'Pages', routine: 'TWICEWEEK',
  },
  {
    id: 3, title: 'Complete the bugs', icon: HABIT_TODO_ICONS.BUG.id, completed: 2, outOf: 12, bgColor: 'BLUE', code: 'Bugs', routine: 'WEEK',
  },
  {
    id: 4, title: 'Follow Diet', icon: HABIT_TODO_ICONS.SPOONKNIFE.id, completed: 12, outOf: 31, bgColor: 'YELLOW', code: 'Days', routine: 'MONTH',
  },
  {
    id: 5, title: 'Read Blogs', icon: HABIT_TODO_ICONS.NEWSPAPER.id, completed: 15, outOf: 23, bgColor: 'GREEN', code: 'Blogs', routine: 'THRICEMONTH',
  },
]

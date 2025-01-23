
export const RecentSearchHistory = [
    "Goodness of God",
    "Goodness",
    "All my life",
    "Goodness of God",
    "Goodness",
    "All my life",
]

const examplesong1 = {   
    route: require('../../assets/exampleSongs/song1.png'),
    name: 'song1',
    songId: 1
}
const examplesong2 = {
    route: require('../../assets/exampleSongs/song2.jpeg'),
    name: 'song2',
    songId: 2
}
const examplesong3 = {
    route: require('../../assets/exampleSongs/song3.jpeg'),
    name: 'song3',
    songId: 3
}
const examplesong4 = {
    route: require('../../assets/exampleSongs/song4.jpeg'),
    name: 'song4',
    songId: 4
}

export const user = {
    userId: 1,
    userPwd: "example",
    name: "example user",
    role: "Leader"
}
export const teamMember1 = {
    userId: 2,
    userPwd: "example",
    name: "example member1",
    role: "Sound Engineer"
}
export const teamMember2 = {
    userId: 3,
    userPwd: "example",
    name: "example member2",
    role: "Drums"
}
export const teamMember3 = {
    userId: 3,
    userPwd: "example",
    name: "example member3",
    role: "Singer"
}

export const set1 = {
    setId: 1,
    setName: "example set",
    setDate: "15/01/2025",
    lastViewed: "21/01/2025",
    views: 7
}
export const setCount = 1;
export const userSets = [
    [{ setId: 1, songId: 1 },
    { setId: 1, songId: 2 },
    { setId: 1, songId: 3 },
    { setId: 1, songId: 4 }],
    [{ setId: 2, songId: 2 },
    { setId: 2, songId: 1 },
    { setId: 2, songId: 4 },
    { setId: 2, songId: 3 }],
]
export const allSongs = {examplesong1, examplesong2, examplesong3, examplesong4}

export const RecentSongList = [
    examplesong1, examplesong2, examplesong3, examplesong4
]
export const RecommendedSongList = [
    examplesong1, examplesong2, examplesong3
]
export const TrendingSongList = [
    examplesong1, examplesong2, examplesong3
]

export const Users = [user, teamMember1, teamMember2, teamMember3]


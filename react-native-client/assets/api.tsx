
interface USER {
    userId: number,
    userPwd: string,
    name: string,
    role: string,
    teamId: 1 | null,
}

interface SONGOBJ {
    route: NodeRequire,
    name: string,
    songId: number
}

interface SETOBJ {
    setId: number,
    setName: string,
    setDate: Date,
    lastViewed: Date,
    views: number,
    setSongs: Array<number>,
}

interface TEAM {
    teamMembers: Array<number>,
    teamId: number,
    teamName: string,
    teamSets: Array<number>,
}

const examplesong1 : SONGOBJ = {   
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

const user = {
    userId: 1,
    userPwd: "example",
    name: "example user",
    role: "Leader",
    teamId: 1,
}
const teamMember1 = {
    userId: 2,
    userPwd: "example",
    name: "example member1",
    role: "Sound Engineer",
    teamId: 1,
}
const teamMember2 = {
    userId: 3,
    userPwd: "example",
    name: "example member2",
    role: "Drums",
    teamId: 1,
}
const teamMember3 = {
    userId: 3,
    userPwd: "example",
    name: "example member3",
    role: "Singer",
    teamId: 1,
}

const set1 = {
    setId: 1,
    setName: "example set",
    setDate: "15/04/2025",
    lastViewed: "21/01/2025",
    views: 7,
    setSongs: [1, 2, 3, 4],
}
const set2 = {
    setId: 2,
    setName: "example set2",
    setDate: "15/06/2025",
    lastViewed: "21/02/2025",
    views: 7,
    setSongs: [1, 3, 4],
}

const team1 = {
    teamMembers: [1, 2, 3, 4],
    teamId: 1,
    teamName: "My First Team",
    teamSets: [1, 2],
}

export const getAllUsers = () => {
    return [user, teamMember1, teamMember2, teamMember3]
}

export const getUser = (userId : number) => {
    const allUsers = getAllUsers();
    for (var user of allUsers) {
        if (user.userId == userId) {
            return user;
        }
    }
}

export const getAllTeams = () => {
    return [team1]
}

export const getAllTeamSetLists = (teamId : number) => {
    const allTeams = getAllTeams();

    var allTeamSets : any = [];
    for (var team of allTeams) {
        if (team.teamId == teamId) {
            allTeamSets = team.teamSets;
        }
    }
    return allTeamSets
}
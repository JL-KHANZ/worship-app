import { userSignIn } from "./firebaseConfig"

declare global {
    interface USEROBJ {
        userId: number,
        userEmail: string,
        userPwd: string,
        userName: string,
        userRole: string,
        userTeamId: number,
        userSetIds: Array<number>,
    }
    
    interface SONGOBJ {
        route: NodeRequire,
        name: string,
        songId: number
    }
    
    interface SETOBJ {
        setId: number,
        setName: string,
        setDate: string,
        lastViewed: string,
        views: number,
        setSongs: Array<number>,
    }
    
    interface TEAM {
        teamMembers: Array<number>,
        teamId: number,
        teamName: string,
        teamSets: Array<number>,
    }
}
export const defaultUser : USEROBJ = {
    userId: 0,
    userPwd: "example",
    userName: "default user obj",
    userEmail: "none@gmail.com",
    userRole: "none",
    userTeamId: 0,
    userSetIds: [] //setId
}
export const defaultSet : SETOBJ = {
    setId: 0,
    setName: "example default set",
    setDate: "15/04/2025",
    lastViewed: "21/01/2025",
    views: 0,
    setSongs: [],
}
export const examplesong1 : SONGOBJ = {
    route: require('./assets/exampleSongs/song1.png'),
    name: 'song1',
    songId: 1
}
const examplesong2 = {
    route: require('./assets/exampleSongs/song2.jpeg'),
    name: 'song2',
    songId: 2
}
const examplesong3 = {
    route: require('./assets/exampleSongs/song3.jpeg'),
    name: 'song3',
    songId: 3
}
const examplesong4 = {
    route: require('./assets/exampleSongs/song4.jpeg'),
    name: 'song4',
    songId: 4
}

const user : USEROBJ = {
    userId: 1,
    userPwd: "example",
    userName: "example user",
    userEmail: "exampleUser@gmail.com",
    userRole: "Leader",
    userTeamId: 1,
    userSetIds: [1, 2] //setId
}
const teamMember1 : USEROBJ = {
    userId: 2,
    userPwd: "example",
    userName: "example member1",
    userEmail: "exampleMember1@gmail.com",
    userRole: "Sound Engineer",
    userTeamId: 1,
    userSetIds: [1],
}
const teamMember2 : USEROBJ = {
    userId: 3,
    userPwd: "example",
    userName: "example member2",
    userEmail: "exampleMember2@gmail.com",
    userRole: "Drums",
    userTeamId: 1,
    userSetIds: [2],
}
const teamMember3 : USEROBJ = {
    userId: 3,
    userPwd: "example",
    userName: "example member3",
    userEmail: "exampleMember3@gmail.com",
    userRole: "Singer",
    userTeamId: 1,
    userSetIds: [1],
}

const set1 : SETOBJ = {
    setId: 1,
    setName: "example set",
    setDate: "15/04/2025",
    lastViewed: "21/01/2025",
    views: 7,
    setSongs: [1, 2, 3, 4],
}
const set2 : SETOBJ = {
    setId: 2,
    setName: "example set2",
    setDate: "15/06/2025",
    lastViewed: "21/02/2025",
    views: 7,
    setSongs: [1, 3, 4],
}

const team1 : TEAM = {
    teamMembers: [1, 2, 3, 4],
    teamId: 1,
    teamName: "My First Team",
    teamSets: [1, 2],
}

export const getAllUsers = () : Array<USEROBJ> => {
    return [user, teamMember1, teamMember2, teamMember3];
}
export const getAllTeams = () : Array<TEAM> => {
    return [team1]
}
export const getAllSongs = () : Array<SONGOBJ> => {
    return [examplesong1, examplesong2, examplesong3, examplesong4];
}
export const getAllSets = () : Array<SETOBJ> => {
    return [set1, set2];
}

export const getUser = (userId : number) : USEROBJ => {
    var user : USEROBJ = defaultUser;
    const allUsers : Array<USEROBJ> = getAllUsers();
    for (var u of allUsers) {
        if (u.userId == userId) {
            user = u;
        }
    }
    return user;
}
export const getSet = (setId : number) : SETOBJ => {
    const allSets = getAllSets();
    var foundSet : SETOBJ = defaultSet;
    for (var set of allSets) {
        if (set.setId == setId) {
            foundSet = set
            break;
        }
    }
    return foundSet;
}

export const getUserSets = (userId : number) : Array<SETOBJ> => {
    const user = getUser(userId);

    var userSets : Array<SETOBJ> = [];
    const setIds = user.userSetIds;
    for (var i of setIds) {
        userSets.push(getSet(i));
    }
    return userSets;
}
export const getAllSetSongs = (setId : number) : Array<SONGOBJ> => {
    const allSongs = getAllSongs();
    const set = getSet(setId);
    var setSongs : Array<SONGOBJ> = [];
    for (var s of allSongs) {
        if (s.songId in set.setSongs) {
            setSongs.push(s);
        }
    }
    return setSongs;
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

export const getRecommendedSongList = () : Array<SONGOBJ> => {
    return getAllSongs();
}
export const getRecentSongList = () : Array<SONGOBJ> => {
    return getAllSongs();
}
export const getTrendingSongList = () : Array<SONGOBJ> => {
    return getAllSongs();
}
export const getRecentSearchHistory = () : Array<string> => {
    return ["example search history 1", "example search history 2", "example search history 3"];
}

export const signIn = (user : USEROBJ) => {
    userSignIn(user)
}


declare global {
  interface USERCLIENT {
    uid: string,
    username: string,
    email: string,
    role: string,
    teamId: string | null,
  }
  interface SONGCLIENT {
    id: string
    name: string,
    key: string | null,
    artist: string | null,
    url: string,
    setId: string | null,
    teamId: string | null,
  }
  interface SETCLIENT {
    id: string,
    name: string,
    date: string,
    lastViewed: string,
    views: number,
    ownerId: string,
  }
  interface TEAMCLIENT {
    teamId: number,
    teamName: string,
  }
}



// auth
export async function clientUserSignUp(username: string, email: string, password: string): Promise<boolean> {
  return true;
}
export async function clientUserSignIn(email: string, password: string): Promise<USERCLIENT | null> {
  return user
}














export const getAllUsers = (): Array<USERCLIENT> => {
  return [user, teamMember1, teamMember2, teamMember3];
}
export const getAllTeams = (): Array<TEAMCLIENT> => {
  return [team1]
}
export const getAllSongs = (): Array<SONGCLIENT> => {
  return [examplesong1, examplesong2, examplesong3, examplesong4];
}
export const getAllSets = (): Array<SETCLIENT> => {
  return [set1, set2];
}

export const getUser = (userId: string): USERCLIENT => {
  var user: USERCLIENT = defaultUser;
  const allUsers: Array<USERCLIENT> = getAllUsers();
  for (var u of allUsers) {
    if (u.uid == userId) {
      user = u;
    }
  }
  return user;
}
export const getSet = (setId: string): SETCLIENT => {
  const allSets = getAllSets();
  var foundSet: SETCLIENT = defaultSet;
  for (var set of allSets) {
    if (set.id == setId) {
      foundSet = set
      break;
    }
  }
  return foundSet;
}

export const getUserSets = (userId: number): Array<SETCLIENT> => {
  // const user = getUser(userId);

  // var userSets: Array<SETOBJ> = [];
  // const setIds = user.userSetIds;
  // for (var i of setIds) {
  //   userSets.push(getSet(i));
  // }
  return [set1, set2];
}
export const getAllSetSongs = (setId: string): Array<SONGCLIENT> => {
  // const allSongs = getAllSongs();
  // const set = getSet(setId);
  // var setSongs: Array<SONGCLIENT> = [];
  // for (var s of allSongs) {
  //   if (s.id in set.setSongs) {
  //     setSongs.push(s);
  //   }
  // }
  // return setSongs;
  return [examplesong1, examplesong2, examplesong3]
}

export const getAllTeamSetLists = (teamId: number) => {
  // const allTeams = getAllTeams();

  // var allTeamSets: any = [];
  // for (var team of allTeams) {
  //   if (team.teamId == teamId) {
  //     allTeamSets = team.teamSets;
  //   }
  // }
  // return allTeamSets
  return [set1, set2]
}

export const getRecommendedSongList = (): Array<SONGCLIENT> => {
  return getAllSongs();
}
export const getRecentSongList = (): Array<SONGCLIENT> => {
  return getAllSongs();
}
export const getTrendingSongList = (): Array<SONGCLIENT> => {
  return getAllSongs();
}
export const getRecentSearchHistory = (): Array<string> => {
  return ["example search history 1", "example search history 2", "example search history 3"];
}









































































export const defaultUser: USERCLIENT = {
  uid: "1",
  username: "default user obj",
  email: "none@gmail.com",
  role: "none",
  teamId: "0",
}
export const defaultSet: SETCLIENT = {
  id: "0",
  name: "example default set",
  date: "15/04/2025",
  lastViewed: "21/01/2025",
  views: 0,
  ownerId: "1234"
}
export const examplesong1: SONGCLIENT = {
  url: require('./assets/exampleSongs/song1.png'),
  artist: "아이자야식스티원",
  name: '내가 소망하는 아버지 나라',
  key: "A",
  id: "1",
  setId: "2",
  teamId: "1",
}
const examplesong2 = {
  url: require('./assets/exampleSongs/song2.jpeg'),
  artist: null,
  name: 'song2',
  key: "A",
  id: "2",
  setId: "2",
  teamId: "1"
}
const examplesong3 = {
  url: require('./assets/exampleSongs/song3.jpeg'),
  artist: null,
  name: 'song3',
  key: "A",
  id: "3",
  setId: "2",
  teamId: "1"
}
const examplesong4 = {
  url: require('./assets/exampleSongs/song4.jpeg'),
  artist: null,
  name: 'song4',
  key: "A",
  id: "4",
  setId: "2",
  teamId: "1"
}

const user: USERCLIENT = {
  uid: "2",
  username: "example user",
  email: "exampleUser@gmail.com",
  role: "Leader",
  teamId: "1",
}
const teamMember1: USERCLIENT = {
  uid: "3",
  username: "example member1",
  email: "exampleMember1@gmail.com",
  role: "Sound Engineer",
  teamId: "1",
}
const teamMember2: USERCLIENT = {
  uid: "4",
  username: "example member2",
  email: "exampleMember2@gmail.com",
  role: "Drums",
  teamId: "1",
}
const teamMember3: USERCLIENT = {
  uid: "5",
  username: "example member3",
  email: "exampleMember3@gmail.com",
  role: "Singer",
  teamId: "1",
}

const set1: SETCLIENT = {
  id: "1",
  name: "example set",
  date: "15/04/2025",
  lastViewed: "21/01/2025",
  views: 7,
  ownerId: "1234"
}
const set2: SETCLIENT = {
  id: "2",
  name: "example set2",
  date: "15/06/2025",
  lastViewed: "21/02/2025",
  views: 7,
  ownerId: "1234"
}

const team1: TEAMCLIENT= {
  teamId: 1,
  teamName: "조이팀",
}


import axios from "axios";


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
    repKey: string | null,
    keys: Array<string> | null,
    artist: string | null,
    url: string,
    teamId: string | null,
  }

  // sets should keep track of songs on their own
  interface SETCLIENT {
    id: string,
    name: string,
    date: string,
    lastViewed: string,
    views: number,
    ownerId: string,
    songs: Array<SONGCLIENT>,
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

// songs
const PUBLIC_IMAGEKIT_KEY = "public_F/HZwWGdM5bx0nOxlmH3zhnSjQ0="
// export async function getSongImage(route : string) {
//   try {
//     const response = await axios.request({
//       method: 'GET',
//       url: 'https://ik.imagekit.io/hanaworship/default-image.jpg?updatedAt=1743827390129',
//       headers: {Accept: 'application/json', Authorization: 'Basic 123'}
//     })
//     console.log(response)
//   } catch (error) {
//     console.error(error)
//   }
// }
export async function getSong(id : string) {
  return examplesong3
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







export async function postSet(songs : Array<SONGCLIENT>) {
  try{
    const res = "setId"
    return res
  }catch (error) {
  }
  return false
}

































































export const defaultUser: USERCLIENT = {
  uid: "1",
  username: "default user obj",
  email: "none@gmail.com",
  role: "none",
  teamId: "0",
}
export const examplesong1: SONGCLIENT = {
  url: "https://ik.imagekit.io/hanaworship/%E1%84%92%E1%85%A1%E1%84%82%E1%85%B3%E1%86%AF%E1%84%8B%E1%85%B4_%E1%84%86%E1%85%AE%E1%86%AB%E1%84%8B%E1%85%B3%E1%86%AF_%E1%84%8B%E1%85%A7%E1%84%89%E1%85%A9%E1%84%89%E1%85%A5_G.jpeg?updatedAt=1748702405053",
  artist: "아이자야식스티원",
  name: '내가 소망하는 아버지 나라',
  repKey: "A",
  keys: ["G", "B"],
  id: "1",
  teamId: "1",
}
const examplesong2 : SONGCLIENT = {
  url: 'https://ik.imagekit.io/hanaworship/%E1%84%82%E1%85%A1%E1%84%8B%E1%85%B4_%E1%84%8B%E1%85%A8%E1%84%87%E1%85%A2%E1%84%85%E1%85%B3%E1%86%AF_%E1%84%87%E1%85%A1%E1%86%AE%E1%84%8B%E1%85%B3%E1%84%89%E1%85%A9%E1%84%89%E1%85%A5_E.jpeg?updatedAt=1748669213484',
  artist: null,
  name: 'song2',
  repKey: "A",
  keys: ["G", "B"],
  id: "2",
  teamId: "1"
}
const examplesong3 : SONGCLIENT = {
  url: 'https://ik.imagekit.io/hanaworship/%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%82%E1%85%B3%E1%86%BC%E1%84%92%E1%85%A1%E1%84%89%E1%85%B5%E1%86%AB_%E1%84%82%E1%85%A1%E1%84%8B%E1%85%B4_%E1%84%8C%E1%85%AE_%E1%84%92%E1%85%A1%E1%84%82%E1%85%A1%E1%84%82%E1%85%B5%E1%86%B7%E1%84%8B%E1%85%B3%E1%86%AB_B.jpeg?updatedAt=1748669332785',
  artist: null,
  name: 'song3',
  repKey: "A",
  keys: ["G", "B"],
  id: "3",
  teamId: "1"
}
const examplesong4 : SONGCLIENT = {
  url: 'https://ik.imagekit.io/hanaworship/%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%82%E1%85%B3%E1%86%BC%E1%84%92%E1%85%A1%E1%84%89%E1%85%B5%E1%86%AB_%E1%84%92%E1%85%A1%E1%84%82%E1%85%A1%E1%84%82%E1%85%B5%E1%86%B7_B.jpeg?updatedAt=1748670114691',
  artist: null,
  name: 'song4',
  repKey: "A",
  keys: ["G", "B"],
  id: "4",
  teamId: "1"
}
export const defaultSet: SETCLIENT = {
  id: "0",
  name: "example default set",
  date: "15/04/2025",
  lastViewed: "21/01/2025",
  views: 0,
  ownerId: "1234",
  songs: [examplesong1, examplesong2]
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
  ownerId: "1234",
  songs: [examplesong1, examplesong2]
}

const set2: SETCLIENT = {
  id: "2",
  name: "example set2",
  date: "15/06/2025",
  lastViewed: "21/02/2025",
  views: 7,
  ownerId: "1234",
  songs: [examplesong1, examplesong2]
}

const team1: TEAMCLIENT= {
  teamId: 1,
  teamName: "조이팀",
}


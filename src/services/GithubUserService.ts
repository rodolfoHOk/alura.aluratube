import axios from 'axios';
import { GithubUser } from '../model/githubUser';

export class GithubUserService {
  static getGithubUserInfos(username: string) {
    return axios
      .get<GithubUser>(`https://api.github.com/users/${username}`)
      .then((response) => response.data);
  }
}

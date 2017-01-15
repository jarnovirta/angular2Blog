import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let comments = [];
    let posts = [
        {
          _id: 1,
          id: 1,
          title: "Jarnon eka blogiposti",
          body: "Jarno kirjoitteli paljon tekstiä mitä aikoo blogittaa vaikka ei koskaan blogitakaan",
          date: "1.1.2017",
          nextCommentId: 2,
          comments: [
            {
              id: 1,
              postId: 1,
              date: "1.1.2017",
              body: "Joku paisti kommentoi tällasta",
              userName: "jokupaisti"
            }
          ]
        },
        {
          id: 2,
          title: "Jarnon toka blogiposti",
          body: "Jarno kirjoitteli paljon tekstiä mitä aikoo blogittaa vaikka ei koskaan blogitakaan",
          date: "1.1.2017"
        },
        {
          id: 3,
          title: "Jarnon kolmas blogiposti",
          body: "Jarno kirjoitteli paljon tekstiä mitä aikoo blogittaa vaikka ei koskaan blogitakaan",
          date: "1.1.2017",
          nextCommentId: 2,
          comments: [
            {
              id: 1,
              postId: 3,
              date: "1.1.2017",
              body: "Joku paisti kommentoi tällasta",
              userName: "jokupaisti"
            }
          ]
        },
        {
          id: 4,
          title: "Jarnon neljäs blogiposti",
          body: "Jarno kirjoitteli paljon tekstiä mitä aikoo blogittaa vaikka ei koskaan blogitakaan",
          date: "1.1.2017",
          nextCommentId: 1,
          comments: []
        }
      ];
    return {comments, posts};
  }
}
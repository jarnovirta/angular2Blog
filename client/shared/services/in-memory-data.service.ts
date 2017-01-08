import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let posts = [
        {
          _id: 1,
          id: 1,
          title: "Jarnon eka blogiposti",
          body: "Jarno kirjoitteli paljon tekstiä mitä aikoo blogittaa vaikka ei koskaan blogitakaan",
          date: "1.1.2017",
          comments: [
            {
              date: "1.1.2017",
              body: "Joku paisti kommentoi tällasta",
              userName: "jokupaisti"
            }
          ]
        },
        {
          _id: 2,
          id: 2,
          title: "Jarnon toka blogiposti",
          body: "Jarno kirjoitteli paljon tekstiä mitä aikoo blogittaa vaikka ei koskaan blogitakaan",
          date: "1.1.2017",
          comments: [
            {
              date: "1.1.2017",
              body: "Joku paisti kommentoi tällasta",
              userName: "jokupaisti"
            }
          ]
        },
        {
          _id: 3,
          id: 3,
          title: "Jarnon kolmas blogiposti",
          body: "Jarno kirjoitteli paljon tekstiä mitä aikoo blogittaa vaikka ei koskaan blogitakaan",
          date: "1.1.2017",
          comments: [
            {
              date: "1.1.2017",
              body: "Joku paisti kommentoi tällasta",
              userName: "jokupaisti"
            }
          ]
        },
        {
          _id: 4,
          id: 4,
          title: "Jarnon neljäs blogiposti",
          body: "Jarno kirjoitteli paljon tekstiä mitä aikoo blogittaa vaikka ei koskaan blogitakaan",
          date: "1.1.2017",
          comments: [
            {
              date: "1.1.2017",
              body: "Joku paisti kommentoi tällasta",
              userName: "jokupaisti"
            }
          ]
        },
        {
          _id: 5,
          id: 5,
          title: "Jarnon viides blogiposti",
          body: "Jarno kirjoitteli paljon tekstiä mitä aikoo blogittaa vaikka ei koskaan blogitakaan",
          date: "1.1.2017",
          comments: [
            {
              date: "1.1.2017",
              body: "Joku paisti kommentoi tällasta",
              userName: "jokupaisti"
            }
          ]
        },
        {
          _id: 6,
          id: 6,
          title: "Jarnon kuudes blogiposti",
          body: "Jarno kirjoitteli paljon tekstiä mitä aikoo blogittaa vaikka ei koskaan blogitakaan",
          date: "1.1.2017",
          comments: [
            {
              date: "1.1.2017",
              body: "Joku paisti kommentoi tällasta",
              userName: "jokupaisti"
            }
          ]
        },
        {
          _id: 7,
          id: 7,
          title: "Jarnon seitsemäs blogiposti",
          body: "Jarno kirjoitteli paljon tekstiä mitä aikoo blogittaa vaikka ei koskaan blogitakaan",
          date: "1.1.2017",
          comments: [
            {
              date: "1.1.2017",
              body: "Joku paisti kommentoi tällasta",
              userName: "jokupaisti"
            }
          ]
        },
        {
          _id: 8,
          id: 8,
          title: "Jarnon kahdeksas blogiposti",
          body: "Jarno kirjoitteli paljon tekstiä mitä aikoo blogittaa vaikka ei koskaan blogitakaan",
          date: "1.1.2017",
          comments: [
            {
              date: "1.1.2017",
              body: "Joku paisti kommentoi tällasta",
              userName: "jokupaisti"
            }
          ]
        },
      ];
    return {posts};
  }
}
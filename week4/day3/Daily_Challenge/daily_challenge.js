// 1.
class Video {
  constructor(title, uploader, time) {
    this.title = title;
    this.uploader = uploader;
    this.time = time;
  }
  
  // 2.
  watch() {
    console.log(`${this.uploader} watched all ${this.time} seconds of ${this.title}!`);
  }
}

// 3.
const video1 = new Video("Cooking Tutorial", "Chef Sarah", 300);
video1.watch();
// 4.
const video2 = new Video("Gaming Highlights", "ProGamer", 120);
video2.watch();

// BONUS:
const videoData = [
  {title: "Yoga Class", uploader: "YogaMaster", time: 600},
  {title: "Car Review", uploader: "CarExpert", time: 480},
  {title: "Music Lesson", uploader: "MusicTeacher", time: 720},
  {title: "Travel Vlog", uploader: "WorldTraveler", time: 900},
  {title: "DIY Project", uploader: "CraftyPerson", time: 360}
];

const videos = [];
for (let i = 0; i < videoData.length; i++) {
  const data = videoData[i];
  const video = new Video(data.title, data.uploader, data.time);
  videos.push(video);
}

videos[0].watch();
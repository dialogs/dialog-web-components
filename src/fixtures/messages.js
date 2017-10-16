/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */
/* eslint-disable */

const senders = [
  {
    avatar: 'https://avatars1.githubusercontent.com/u/3505878',
    placeholder: 'red',
    title: 'Nikita 🤷',
    userName: 'gusnkt',
    peer: {
      id: 1643224499,
      type: 'user'
    }
  },
  {
    avatar: 'https://avatars1.githubusercontent.com/u/930121',
    placeholder: 'purple',
    title: 'Oleg Shilov',
    userName: 'olegshilov',
    peer: {
      id: 1709029441,
      type: 'user'
    }
  }
];

module.exports = [
  {
    sender: senders[0],
    rid: Math.random(),
    date: '20:30',
    fullDate: new Date(),
    state: 'read',
    content: {
      type: 'text',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis ipsum viverra, eleifend ante nec, porta enim.'
    },
    isEdited: true
  },
  {
    sender: senders[0],
    rid: Math.random(),
    date: '20:20',
    fullDate: new Date(),
    state: 'error',
    content: {
      type: 'text',
      text: 'Quisque sollicitudin purus eget dui imperdiet, sed imperdiet dui mollis.'
    }
  },
  {
    sender: senders[1],
    rid: Math.random(),
    date: '20:31',
    fullDate: new Date(),
    state: 'pending',
    content: {
      type: 'photo',
      fileUrl: 'https://s3.amazonaws.com/psiu/wallpapers/heic0604a/heic0604a_desktop.jpg',
      fileName: 'heic0604a_desktop.jpg',
      preview: 'data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAAyAFoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDg6KKKYhSzMFDEkKMDJ6Dr/WjvSU9aBjRT2DBcHHqMHPbNSJErDg5OMnPFWVt1MRKctngelK5rGkyiR+dKEJzxWhDp0srBVQkmt2z8LyOoaU7R3qkjGTSOT8pscCkMTAZIrtrjQ7ezgJBBbGeSK5y5kVQUCjI/SrUYtbmLnO9rGSRiinP96m1DNhKKWgCkAoFSKpJwKFXJAFbOn6Y0gDyxPtyD1wMf5xzTSE5JFW0sJ7jOxeM4Ge5rX0/R54ruJJ1dCx7xkg4GcZH+eK6DR5LaOAGYCJlXOCMAgDrnt9Dzwabf6iFvkCEA5K8dQuPXnHP06D0rOcktjelzyepatbVI4oWChck7sgEj0ArJ1fV2hO2MsrhCeGIznoenFOk1PzUbIKkA4Irl76QFid2T7mpjeW45x5dhl1ezzMxmcue285IFUpN+0OwOG6E96R3zRLdTSwRQu5aKLOxT0GetamLISc0p4JAIPuKbRQIUCrEcee1QqxAxk4JyRUwn29OtNCd7aGlZJBFIrS4yOzHFa0viCJYliXG0jqnX/PWuWedn+8SfxpgfFVKV9CIU+V3bOguNcefhBsXAB3ckgev5mq0V0TPncR0HWsgPj2o8zAx61k4pnVCfKbc92i2yrvLEn5WxwBWXM6yKCzc4J9Oef/rVE8u+IKfvL39R71EzZ7AU0rFTqXEJyaSiimYBRRRQIWiiigAo70UUAFFFFAAOtJ3oooAO9FFFAxe1FFFAj//Z',
      width: 2560,
      height: 1440
    },
    isEdited: true
  },
  {
    sender: senders[1],
    rid: Math.random(),
    date: '4:20',
    fullDate: new Date(),
    state: 'sent',
    content: {
      content: 'voice',
      type: 'voice',
      duration: 4920,
      fileExtension: 'opus',
      fileName: 'voice.opus',
      fileSize: '30 KB',
      fileUrl: 'http://www.html5tutorial.info/media/vincent.mp3',
      isUploading: false
    }
  },
  {
    sender: senders[0],
    rid: Math.random(),
    date: '12:32',
    fullDate: new Date(),
    state: 'received',
    content: {
      type: 'document',
      preview: '',
      fileName: 'dialog.dmg',
      fileExtension: 'dmg',
      fileUrl: 'https://dlg.im/dl/osx',
      fileSize: '666 Mb',
      isUploading: false
    }
  },
  {
    sender: senders[0],
    rid: Math.random(),
    date: '00:00',
    fullDate: new Date(),
    state: 'read',
    content: {
      type: 'video',
      width: 640,
      height: 352,
      duration: 600,
      fileName: 'test.mp4',
      fileSize: '788 KB',
      preview: null,
      fileUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      isUploading: false
    }
  }
];

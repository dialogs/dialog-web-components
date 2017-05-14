/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 */

/* eslint-disable */


const sender = {
  avatar: 'https://avatars1.githubusercontent.com/u/3505878',
  placeholder: 'red',
  title: 'Nikita 🤷',
  userName: 'gusnkt',
  peer: {
    id: 1643224499,
    type: 'user'
  }
};

const peerInfo = {
  avatar: 'https://ee-prod.s3.amazonaws.com/file_-8194895790165291807/small-avatar.jpg?AWSAccessKeyId=AKIAIUGQCM6GL6LEBPJQ&Expires=1491992460&Signature=esTiPK0JRo6XPr%2Fw9HKnd9Y2CJU%3D',
  title: 'Web',
  placeholder: 'blue',
  type: 'group',
  peer: {
    id: 1421407744,
    type: 'group'
  }
};

module.exports = {
  peerInfo,
  messages: [
    {
      sender,
      rid: Math.random(),
      date: '20:30',
      fullDate: new Date(),
      state: 'read',
      content: {
        type: 'text',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis ipsum viverra, eleifend ante nec, porta enim.'
      }
    },
    {
      sender,
      rid: Math.random(),
      date: '20:30',
      fullDate: new Date(),
      state: 'error',
      content: {
        type: 'text',
        text: 'Quisque sollicitudin purus eget dui imperdiet, sed imperdiet dui mollis.'
      }
    },
    {
      sender,
      rid: Math.random(),
      date: '20:31',
      fullDate: new Date(),
      state: 'pending',
      content: {
        type: 'text',
        text: 'Donec iaculis augue eu blandit scelerisque.'
      }
    },
    {
      sender,
      rid: Math.random(),
      date: '20:31',
      fullDate: new Date(),
      state: 'sent',
      content: {
        type: 'photo',
        fileUrl: 'https://s3.amazonaws.com/psiu/wallpapers/heic1302a/heic1302a_desktop.jpg',
        fileName: 'heic1302a_desktop.jpg',
        preview: 'data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAAyAFoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDzoDPNLiinhaoQgFOClj0p8cZY9K0bazJwSKASuVIrcnqKvxWg4GMn2q/BYfMBg5rds9MjAXPU/wAR7VMppG0Kfcy7LRmn2sfu9f8APvWwFtdOhKlIhKv8QyT+vH/16stBD9nxNcbMH5dp2isy9hd0XysFcYI+nvWftLI0jC7sineXKz7nZmLOec//AK6x2ZUlIbcV9Acc9u3vV+SFl64H41RYEOHwPl55GR/hRGSb0LnCaVmQ3D71ypG3tgYqpU8zjaABgDiqm+tpbnGisKsQqG4PFRKuSKtwR8ikCLdrbEHO3PNbFqgLqqrwO9VLYpt+c8qOK1bEIpDhgc5J4xUydjphFWubdlZDau7nI71spZJ5YL4AHTNYq6gYiAilz2YAkU6TUX5kmXAUZXnJ9+K4+byubunJ9SW6EO8D5ipJAXs3pnPbI/lWQ8u2MBcK4AYg88HPX/D0/VL66bD73O7khs4Ge2Mf55rLku3mRo12heoUnBwPU/4//WrSnHuTJ2QkiyuHzyR74zWU05YcEA9m/pUt5OcFdyk/7PArNaQYIXjNaqK6EyrPZjZ3wxUEHB6jvUBJBI4496GOTkmm5rU42Txr071dhUgggd6rxjFW43UYOeRVAi3bqzOABjJwTnFXoVLSJGx2hRjOMZHvVK3lHmdePVvWrhZYo/MdVMpyBzjjjn6HP6HpUOLZvGSiaL3CxR5x0HBqrLPIzLJuwUBx261Ra8KsSTG/HXBI6dBn8qpzXhOQD1qVTSepbrXWhburtGVQq4woByc8/Ws6SbBO04J61E8hyec5quzjNUomUqjY6SQseP51GNgYiUlRg4KjPOOO/TOP/r9KR2K446+tRu2TmixncYeaTNBpuaCTQTp+Fbumog1TTsKo3MhOB1+aiitVswW6GT8ISOolfH/fVUJGJbkk0UU5fCgXxsic1CT8ooorJFsY3Q1E/UUUUyCS7JygzxtHH4CqveiiiW4lsNNJRRSGf//Z',
        width: 2560,
        height: 1440
      }
    },
    {
      sender,
      rid: Math.random(),
      date: '20:32',
      fullDate: new Date(),
      state: 'received',
      content: {
        type: 'text',
        text: 'Suspendisse sodales purus tellus, non sollicitudin dolor consectetur vel. Sed non facilisis ex. Pellentesque eu urna ac quam eleifend tristique ut at est. Aliquam condimentum nec quam congue imperdiet.'
      }
    }
  ]
};

const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const noBlogs = []

  const fourBlogs = [
    {
        "title": "Testiblogi",
        "author": "Koodari",
        "url": "http://google.fi",
        "likes": 5,
        "id": "6972283320f92c6b33da452e"
    },
    {
        "title": "Otsikko",
        "author": "Meikä Läinen",
        "url": "http://jyu.fi",
        "likes": 5000,
        "id": "697229fe7ce98bde28549c10"
    },
    {
        "title": "Testi",
        "author": "Post Test",
        "url": "https://react.dev/",
        "likes": 20,
        "id": "697234d2636342f803d75eea"
    },
    {
        "title": "Testi",
        "author": "Post Test",
        "url": "https://react.dev/",
        "likes": 20,
        "id": "6972359a172eb02c5460971a"
    }
  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('likes with no blogs', () => {
    const result = listHelper.totalLikes(noBlogs)
    assert.strictEqual(result, 0)
  })

  test('likes with four blogs', () => {
    const result = listHelper.totalLikes(fourBlogs)
    assert.strictEqual(result, 5045)
  })

})


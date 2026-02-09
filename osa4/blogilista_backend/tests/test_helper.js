const Blog = require('../models/blog')

const initialBlogs = [
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

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon' })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => JSON.parse(JSON.stringify(blog.toJSON())))
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
    usersInDb,
}
const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../tests/test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

describe('blog list tests', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  describe('get', () => {
    // tehtävä 4.8
    test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs')
      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    // tehtävä 4.9
    test('blog field name id instead of _id', async () => {
      const response = await api.get('/api/blogs')
      const first = response.body[0]
      assert.ok(first.id)
      assert.strictEqual(first._id, undefined)
    })
  })

  describe('add', () => {
    // tehtävä 4.10
    test('a valid blog can be added', async () => {
      const newBlog = {
        title: "Uusi Blogi",
        author: "Uuden blogin tekijä",
        url: "www.facebook.com",
        likes: 123
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(n => n.title)
      assert(titles.includes('Uusi Blogi'))
    })

    // tehtävä 4.11
    test('likes default value 0', async () => {
      const newBlog = {
        title: "Uusi Blogi",
        author: "Uuden blogin tekijä",
        url: "www.facebook.com",
      }

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.likes, 0)
    })

    // tehtävä 4.12
    test('if new blog does not have title, respond with 400', async () => {
      const blogWithoutTitle = {
        author: "Uusi Blogaaja",
        url: "http://testaaja.fi",
      }

      await api
        .post('/api/blogs')
        .send(blogWithoutTitle)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('if new blog does not have url, respond with 400', async () => {
      const blogWithoutUrl = {
        author: "Blogger",
        title: "New blog",
        likes: 100
      }

      await api
        .post('/api/blogs')
        .send(blogWithoutUrl)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  describe('delete', () => {
    // tehtävä 4.13
    test('a blog can be deleted', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      const ids = blogsAtEnd.map(n => n.id)
      assert(!ids.includes(blogToDelete.id))
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })
  })

  describe('update', () => {
    // tehtävä 4.14
    test('a blogs likes can be updated', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updatedBlog = {
        likes: blogToUpdate.likes + 1,
      }

      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)

      assert.strictEqual(response.body.likes, blogToUpdate.likes + 1)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
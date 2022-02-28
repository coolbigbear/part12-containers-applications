import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('Only title and author are visible by default', () => {
    const blog = {
        title: 'testTitle',
        author: 'testAuthor',
        url: 'testURL',
        likes: 99
    }

    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} likeBlog={mockHandler} deleteBlog={mockHandler} username='null'/>
    )

    expect(component.container).toHaveTextContent('testTitle')
    expect(component.container).toHaveTextContent('testAuthor')
    expect(component.container).not.toHaveTextContent('testURL')
    expect(component.container).not.toHaveTextContent('likes: 99')
})

test('Blog URL and likes are shown when button is pressed', () => {
    const blog = {
        title: 'testTitle',
        author: 'testAuthor',
        url: 'testURL',
        likes: 99,
        user: {
            username: 'testUsername'
        }
    }

    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} likeBlog={mockHandler} deleteBlog={mockHandler} username='null' />
    )

    const button = component.getByText('Show more')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('testTitle')
    expect(component.container).toHaveTextContent('testAuthor')
    expect(component.container).toHaveTextContent('testURL')
    expect(component.container).toHaveTextContent('likes 99')
})

test('Form calls the event handler it received as props with the right details when a new blog is created', () => {
    const blog = {
        title: 'testTitle',
        author: 'testAuthor',
        url: 'testURL',
        likes: 99,
        user: {
            username: 'testUsername'
        }
    }

    const mockHandler = jest.fn()

    const component = render(
        <BlogForm createBlog={mockHandler} />
    )

    const form = component.container.querySelector('form')
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    fireEvent.change(title, {
        target: { value: blog.title }
    })
    fireEvent.change(author, {
        target: { value: blog.author }
    })
    fireEvent.change(url, {
        target: { value: blog.url }
    })
    fireEvent.submit(form)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe(blog.title)
    expect(mockHandler.mock.calls[0][0].author).toBe(blog.author)
    expect(mockHandler.mock.calls[0][0].url).toBe(blog.url)

})

test('Clicking like button twice calls like function twice', () => {
    const blog = {
        title: 'testTitle',
        author: 'testAuthor',
        url: 'testURL',
        likes: 99,
        user: {
            username: 'testUsername'
        }
    }

    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} likeBlog={mockHandler} deleteBlog={mockHandler} username='null' />
    )

    const button = component.getByText('Show more')
    fireEvent.click(button)

    const buttonTwo = component.getByText('like')
    fireEvent.click(buttonTwo)
    fireEvent.click(buttonTwo)

    expect(mockHandler.mock.calls).toHaveLength(2)
})
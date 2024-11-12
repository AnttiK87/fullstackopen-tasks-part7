// Helper file for managing E2E tests

// Dependancies
const { expect } = require('@playwright/test')

//Helper fuction for loggin in
const loginWith = async (page, username, password) => {
  await page.click('[name="openLogin"]')
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.click('[name="login"]')
}

//Helper fuction for creating blog
const createBlog = async (page, title) => {
  await page.getByRole('button', { name: 'Add new blog' }).click()
  await page.getByTestId('title').fill(title)
  await page.getByTestId('author').fill('playwright')
  await page.getByTestId('url').fill('https://www.playwright.com/')
  await page.getByRole('button', { name: 'Create' }).click()

  await page.waitForSelector(`text=${title}`)
}

const createBlogAfter = async (page, title) => {
  await page.getByTestId('title').fill(title)
  await page.getByTestId('author').fill('playwright')
  await page.getByTestId('url').fill('https://www.playwright.com/')
  await page.getByRole('button', { name: 'Create' }).click()

  await page.waitForSelector(`text=${title}`)
}

//Helper fuction for adding likes to a blog
const addLikes = async (page, title, count) => {
  await page.getByRole('link', { name: `Title: ${title}` }).click()
  for (let i = 0; i < count; i++) {
    await page.getByRole('button', { name: 'Like' }).click()
    await page.waitForSelector(`text=Likes: ${i + 1}`)
  }
  await expect(page.getByText(`Likes: ${count}`)).toBeVisible()
  await page.getByRole('link', { name: 'Home' }).click()
}

//Helper fuction for checking the correct order of the blogs
const likesToArray = async (page) => {
  const blogElements = page.locator('.blogStyle')
  const count = await blogElements.count()
  let likesArray = []

  for (let i = 0; i < count; i++) {
    const blogTitle = await blogElements.nth(i).textContent()
    console.log(`Blog title content: ${blogTitle}`)

    await page.getByRole('link', { name: `${blogTitle}` }).click()

    //await page.waitForSelector('.test >> div:has-text("Likes:")')
    await page.waitForSelector('.test >> div.likes:has-text("Likes:")')

    const likesText = await page
      .locator('.test >> div.likes:has-text("Likes:")')
      .textContent()
    console.log(`likes text content: ${likesText}`)

    const likes = parseInt(likesText.replace('Likes: ', ''))
    likesArray.push(likes)

    await page.getByRole('link', { name: 'Home' }).click()
  }

  console.log(`likes array content: ${likesArray}`)
  return likesArray
}

export { loginWith, createBlog, createBlogAfter, addLikes, likesToArray }

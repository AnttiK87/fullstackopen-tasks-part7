// Helper file for managing E2E tests

// Dependancies
const { expect } = require('@playwright/test')

//Helper fuction for loggin in
const loginWith = async (page, username, password)  => {
  await page.getByRole('button', { name: 'login' }).click()
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
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

//Helper fuction for adding likes to a blog
const addLikes = async (page, title, count) => {
  await page.getByText(`Title: ${title}`)
    .getByRole('button', { name: 'View' }).click()
  for (let i = 0; i < count; i++) {
    await page.getByRole('button', { name: 'Like' }).click()
    await page.waitForSelector(`text=Likes: ${i+1}`)
  }
  await expect(page.getByText(`Likes: ${count}`)).toBeVisible()
  await page.getByRole('button', { name: 'Hide' }).click()
}

//Helper fuction for checking the correct order of the blogs
const likesToArray = async (page) => {
  const blogElements = page.locator('.blogStyle')
  const count = await blogElements.count()
  let likesArray = []

  for (let i = 0; i < count; i++) {
    const blogTitle = await blogElements.nth(i).textContent()
    console.log(`Blog title content: ${blogTitle}`)


    await page.getByText(`${blogTitle}`)
      .getByRole('button', { name: 'View' }).click()

    await page.waitForSelector('.blogStyle >> div:has-text("Likes:")')

    const likesText = await page.locator('.blogStyle >> div:has-text("Likes:")').textContent()
    console.log(`likes text content: ${likesText}`)

    const likes = parseInt(likesText.replace('Likes: ', ''))
    likesArray.push(likes)

    await page.getByRole('button', { name: 'Hide' }).click()
  }

  console.log(`likes array content: ${likesArray}`)
  return likesArray
}

export { loginWith, createBlog, addLikes, likesToArray }
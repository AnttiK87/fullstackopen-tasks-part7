// E2Etestnig for blog application

//dependencies
const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog, addLikes, likesToArray } = require('./helper')

describe('Blog app', () => {

  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Antti Kortelainen',
        username: 'akortelai',
        password: 'salainen'
      }
    })

    await request.post('/api/users', {
      data: {
        name: 'Matti Möttönen',
        username: 'mmotton',
        password: 'salainen'
      }
    })

    await page.goto('/')
  })

  test('page can be opened', async ({ page }) => {
    const locator = await page.getByText('The List of Blogs')
    await expect(locator).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, 'akortelai', 'wrongpassword')

    const errorDiv = await page.locator('.error')
    await expect(errorDiv).toContainText('Wrong username or password!')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

    await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
  })

  test('login is possible', async ({ page }) => {
    await loginWith(page, 'akortelai', 'salainen')
    await expect(page.getByText('Antti Kortelainen is logged in.')).toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'akortelai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'a test blog created')
      await expect(page.getByText('Title: a test blog created')).toBeVisible()
    })

    test('a new blog can be deleted', async ({ page }) => {
      await createBlog(page, 'a test blog to be deleted')

      await page.getByText('Title: a test blog to be deleted')
        .getByRole('button', { name: 'View' }).click()

      page.on('dialog', async dialog => {
        console.log(dialog.message())
        await dialog.accept()
      })
      await page.getByRole('button', { name: 'Delete' }).click()

      await expect(page.getByText('Title: a test blog to be deleted')).not.toBeVisible()
    })

    describe('After blogs were added', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'first test blog created')
        await createBlog(page, 'second test blog created')
        await createBlog(page, 'Third test blog created')
      })

      test('like can be added to one of the blogs', async ({ page }) => {
        await expect(page.getByText('Title: first test blog created')).toBeVisible()
        await expect(page.getByText('Title: second test blog created')).toBeVisible()
        await expect(page.getByText('Title: third test blog created')).toBeVisible()

        await addLikes(page, 'second test blog created', 5)
      })

      test('blog with most likes is first of the list', async ({ page }) => {
        await expect(page.getByText('Title: first test blog created')).toBeVisible()
        await expect(page.getByText('Title: second test blog created')).toBeVisible()
        await expect(page.getByText('Title: third test blog created')).toBeVisible()

        await addLikes(page, 'first test blog created', 1)
        await addLikes(page, 'second test blog created', 5)
        await addLikes(page, 'third test blog created', 3)

        const likes = await likesToArray(page)

        for (let i = 0; i < likes.length - 1; i++) {
          expect(likes[i]).toBeGreaterThanOrEqual(likes[i + 1])
        }
      })
    })

  })

  describe ('delete button shown to correct user', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'akortelai', 'salainen')
      await createBlog(page, 'a test for delete button')
    })

    test('delete button is visible for user who added the blog', async ({ page }) => {
      await page.getByText('Title: a test for delete button')
        .getByRole('button', { name: 'View' }).click()

      await expect(page.getByRole('button', { name: 'Delete' })).toBeVisible()
    })

    test('delete button is not visible for other users', async ({ page }) => {
      await page.getByRole('button', { name: 'Logout' }).click()

      await loginWith(page, 'mmotton', 'salainen')

      await page.getByText('Title: a test for delete button')
        .getByRole('button', { name: 'View' }).click()

      await expect(page.getByRole('button', { name: 'Delete' })).not.toBeVisible()
    })
  })

})
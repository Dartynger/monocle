import axios from './axios'

browser.runtime.onMessage.addListener(async (data) => {
  switch (data.type) {
    case 'getToken':
      return getToken()
    case 'getUser':
      return getUser(data.token)
    case 'removeUser':
      return removeUser()
    case 'getStatement':
      return getStatement(data.account)
    case 'getCurrency':
      return getCurrency()
    case 'setWebhook':
      return setWebhook(data.token)
    default:
      return null
  }
})

async function getToken() {
  const { monocleToken } = await browser.storage.local.get('monocleToken')

  return monocleToken
}

async function setWebhook() {
  try {
    await browser.notifications.create({
      type: 'basic',
      iconUrl: 'icons/128.png',
      title: 'Hello from Monocle',
      message: 'Main message'
    })
    browser.browserAction.setBadgeBackgroundColor({ color: 'green' })
    browser.browserAction.setBadgeText({ text: '+1' })
  } catch (e) {
    console.log(e)
  }
  // await browser.notifications.create({
  //   title: 'Hello from Monocle',
  //   message: 'Main message'
  // })
  // try {
  //   await axios.post('/personal/webhook', {
  //     webHookUrl:
  //       'https://us-central1-monocle-7ae4c.cloudfunctions.net/api/events'
  //   })

  //   return {}
  // } catch (error) {
  //   return { error: error.response }
  // }
}

async function getUser(token) {
  if (!token) {
    const [{ monocleToken }, { monocleUser }] = await Promise.all([
      browser.storage.local.get('monocleToken'),
      browser.storage.local.get('monocleUser')
    ])

    axios.defaults.headers.common['X-Token'] = monocleToken

    if (monocleUser) return { data: monocleUser }
  }

  axios.defaults.headers.common['X-Token'] = token

  try {
    const data = await axios.get('/personal/client-info')

    await Promise.all([
      browser.storage.local.set({ monocleToken: token }),
      browser.storage.local.set({ monocleUser: data })
    ])

    return { data }
  } catch (error) {
    return { error: error.response }
  }
}

async function removeUser() {
  try {
    await Promise.all([
      browser.storage.local.remove('monocleToken'),
      browser.storage.local.remove('monocleUser')
    ])
    return { data: true }
  } catch (error) {
    return { data: false }
  }
}

async function fetchStatement(account, from, to) {
  return await axios.get(`/personal/statement/${account}/${from}/${to}`)
}

const throttledFetchStatement = throttle(fetchStatement, 60 * 1000)

async function getStatement(account) {
  const to = Math.round(new Date().getTime() / 1000)
  const from = Math.round(to - 30 * 24 * 60 * 60)
  const storage = await browser.storage.local.get(`statement_${account}`)
  let data = storage[`statement_${account}`]

  try {
    const response = await throttledFetchStatement(account, from, to)
    if (response) {
      data = response
      await browser.storage.local.set({ [`statement_${account}`]: data })
    }
    return { data }
  } catch (error) {
    return { data, error: error.response.data }
  }
}

async function fetchCurrency() {
  return await axios.get(`/bank/currency`)
}

const throttledFetchCurrency = throttle(fetchCurrency, 60 * 1000)

async function getCurrency() {
  const storage = await browser.storage.local.get(`currency`)
  let data = storage.currency

  try {
    const response = await throttledFetchCurrency()
    if (response) {
      data = response
      await browser.storage.local.set({ currency: data })
    }
    return { data }
  } catch (error) {
    return { data, error: error.response.data }
  }
}

function throttle(func, limit) {
  let inThrottle

  return function(...args) {
    const context = this

    if (!inThrottle) {
      return func.apply(context, args).catch((error) => {
        if (error.response.status === 429) {
          inThrottle = true
          setTimeout(() => {
            inThrottle = false
          }, limit)
        }
      })
    }
  }
}

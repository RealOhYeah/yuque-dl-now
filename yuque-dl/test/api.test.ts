import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { TestTools } from './helpers/TestTools'
import { server } from './mocks/server'
import { KNOWLEDGE_BASE_URL } from './helpers/constant'
import { getDocsMdData, getKnowledgeBaseInfo, genCommonOptions } from '../src/api'

let testTools: TestTools

describe('api', () => {
  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' })
  })
  afterAll(() => server.close())

  beforeEach(() => {
    testTools = new TestTools()
  })

  afterEach(() => {
    testTools.cleanup()
    server.resetHandlers()
  })

  describe('getKnowledgeBaseInfo', () => {
    it('should work', async () => {
      const data = await getKnowledgeBaseInfo(KNOWLEDGE_BASE_URL.NORMAL, {
        token: 'token',
        key: 'key'
      })
      expect(data.bookId).toBe(41966892)
      expect(data.bookSlug).toBe('welfare')
      expect(data.tocList?.length).toBe(2)
      expect(data.bookName).toBe('🤗 语雀公益计划')
      expect(data.bookDesc).toBe('')
      expect(data.imageServiceDomains?.length).toBe(70)
    })

    it('404 should throw Error', async () => {
      let isError = false
      try {
        const data = await getKnowledgeBaseInfo('http://localhost/404', {})
        expect(data).toMatchObject({})
      } catch(e) {
        isError = true
        expect(e.message).toBe('Request failed with status code 404')
      }
      expect(isError).toBe(true)
    })
  })

  describe('getDocsMdData', () => {
    it('should work', async () => {
      const params = {
        articleUrl: 'edu',
        bookId: 41966892,
      }
      const data = await getDocsMdData(params)
      expect(data.apiUrl).toBe('https://www.yuque.com/api/docs/edu?book_id=41966892&merge_dynamic_data=false&mode=markdown')
      expect(data.httpStatus).toBe(200)
      expect(data.response?.data.sourcecode).toBeTruthy()
    })
  })

  it('genCommonOptions should work', async () => {
    const data = genCommonOptions({
      key: 'test_key',
      token: 'test_token'
    })
    expect(data.headers?.cookie).toMatchObject('test_key=test_token;')
    const redirectObj = {} as any
    if (data.beforeRedirect) {
      data.beforeRedirect(redirectObj, null as any)
    }
    expect(redirectObj?.headers?.cookie).toMatchObject('test_key=test_token;')
  })
})

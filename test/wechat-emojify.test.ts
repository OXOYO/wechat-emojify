import { wechatEmojify, wechatEmojiMap } from '../src/wechat-emojify'

/**
 * Dummy test
 */
describe('wechat emoji test', () => {
    it('throw error to non-string', () => {
        expect(() => wechatEmojify({} as any)).toThrow()
    })
    it('can decode wechat-encoded emoji to unicode', () => {
        expect(wechatEmojify('')).toBe('')
        expect(wechatEmojify('\ue404')).toBe('😁')
        expect(wechatEmojify('I love you \ue327')).toBe('I love you 💓')
    })

    it('can handle unicode emoji correctly', () => {
        expect(wechatEmojify('\ue32c I love you 💓')).toBe('💛 I love you 💓')
    })

    it('can import emoji map seperately', () => {
        expect(wechatEmojiMap['\ue404']).toBe('😁')
    })
})

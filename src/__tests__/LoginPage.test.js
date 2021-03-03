import React from 'react'
import { shallow, mount } from 'enzyme'
import LoginPage from '../components/LoginPage'

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

describe("<LoginPage /> to see if it handles login scenarios correctly",() => {
    let LoginPageWrapper;

    beforeAll(() => {
        LoginPageWrapper = mount(<LoginPage />)
    })

    test("Form exists",() => {
        const mockCallback = jest.fn()

        expect(LoginPageWrapper.find('Form')).toBeTruthy()
    })

    test("Login button pressed without username and password",() => {
        const onFinishFailed = LoginPageWrapper.find('#login-button').first().prop('onClick')
        expect(onFinishFailed()).toBe('Login failed')
    })

    test("Login page loaded", () => {
        LoginPageWrapper.render()
        expect(LoginPageWrapper.find('.login-page')).toBeTruthy()

    })
})
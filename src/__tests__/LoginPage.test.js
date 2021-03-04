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


    test("should work if its simple function", () => {

        let handleTest = LoginPageWrapper.find('.test-button').first().prop('onClick')

        expect(handleTest()).toBe(20)
    })


    test("Login button pressed without username and password",async () => {

        const handleLogin = LoginPageWrapper.find('#login-button').first().prop('onClick')

        expect(handleLogin).toHaveBeenCalledWith({
            email: 'as@gmail.com',
            password: '1234'
        }).toBe('auth/argument-error');

        // LoginPageWrapper.find('#login-button').simulate('click', { email: 'ass@gmail.com', password: '12344' });


    })


})
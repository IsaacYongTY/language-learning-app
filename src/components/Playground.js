import React, { useEffect } from 'react'

import Header from "./Header";
import { capitalizeWord } from '../lib/library'
import Sanscript from '@sanskrit-coders/sanscript'
import pinyin from 'pinyin_js'
import { toRomaji } from 'wanakana'
import aromanize from 'aromanize'

const Playground = (props) => {

    // useEffect(()=>{
    //
    // },[])
    //

    //     }
    // }

    const romanizeWord = (word, targetLanguage) => {
        switch (targetLanguage) {
            case('zh'):
                return pinyin.pinyin(word, ' ')
            case('th'):
                return 'coming soon'
            case('ta'):
                return Sanscript.t(word,'tamil','hk')
            case('ja'):
            case('ko'):
                return aromanize.toLatin(word)

            default:
                return null
        }
    }

    console.log(romanizeWord('你好', 'zh'))
    console.log(romanizeWord('ネコ', 'ja'))
    console.log(romanizeWord('새', 'ko'))

    return (
        <div>

            This is a playground
        </div>
    )
}

export default Playground

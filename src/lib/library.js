import ipaDictEN from 'ipa-dict/lib/en_US'
import ipaDictZhHans from 'ipa-dict/lib/zh_hans'

export const capitalizeWord = (word) => word.split('').map((char, index) => !index ? char.toUpperCase() : char).join('')




export const ipaDict = {
    en: ipaDictEN
}
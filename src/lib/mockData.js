export const mockData = [
    {
        id: 1,
        word: 'cat',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/language-learning-app-bced4.appspot.com/o/cat.jpeg?alt=media&token=c888181c-5e8f-432d-beb2-451edbcc375c',
        languages:
            [
                {
                    code: 'en',
                    word: 'cat',
                    romanized: null,
                    gender: false,
                    feminine: null,
                    pronunciation: 'some sort of mp3',
                    verified: true

                },

                {
                    code: 'es',
                    word: 'gato',
                    romanized: null,
                    gender: true,
                    feminine: 'gata',
                    pronunciation: 'some sort of mp3',
                    verified: true

                },

                {
                    code: 'zh',
                    word: '猫',
                    romanized: 'mao1',
                    gender: false,
                    feminine: null,
                    pronunciation: 'some sort of mp3',
                    verified: true
                }
            ]
    },
    {
        id: 2,
        word: 'dog',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/language-learning-app-bced4.appspot.com/o/dog.jpg?alt=media&token=45a0ca66-0b18-481c-8f3f-e07ea27c97ff',
        languages:
            [
                {
                    code: 'en',
                    word: 'dog',
                    romanized: null,
                    feminine: null,
                    pronunciation: 'some sort of mp3',
                    verified: true

                },

                {
                    code: 'es',
                    word: 'perro',
                    romanized: null,
                    feminine: 'perra',
                    pronunciation: 'some sort of mp3',
                    verified: true

                },

                {
                    code: 'zh',
                    word: '狗',
                    romanized: 'gou3',
                    feminine: null,
                    pronunciation: 'some sort of mp3',
                    verified: true
                }


            ]

    }
]

export const languageInfo = [
    {
        languageName: 'English',
        code: 'en',
        isGender: false,
        writingSystem: 'latin',
        description: 'This is a description about the English language.'

    },
    {
        languageName: 'chinese',
        code: 'zh',
        isGender: false,
        writingSystem: 'chineseCharacter',
        isPhonetic: true
    },
    {
        languageName: 'spanish',
        code: 'es',
        isGender: true,
        writingSystem: 'latin'
    }
]
import randomName from 'random-name';
import naampje from 'naampje';

export const buildRandomBook = () => ({
    author: randomName.first().split('.')[0].trim(),
    country: 'England',
    language: 'english',
    pages: Math.floor( Math.random() * 400),
    title: naampje.name(),
    year: 1800 + Math.floor(Math.random * 220)
})

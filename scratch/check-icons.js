import fs from 'fs';

const files = fs.readdirSync('D:/ash-web-nuxt/node_modules/@lucide/vue/dist/esm/icons');
console.log(files.filter(f => f.includes('facebook') || f.includes('instagram') || f.includes('youtube') || f.includes('twitter') || f.includes('face') || f.includes('insta')));

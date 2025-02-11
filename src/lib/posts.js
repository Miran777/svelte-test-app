import axios from 'axios';
import { writable } from 'svelte/store';

// Хранилище для постов
export const posts = writable([]);

// Функция для загрузки постов из API
export async function fetchPosts() {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const data = response.data.slice(0, 100); // Берем только 100 постов
        posts.set(data); // Обновляем хранилище
        localStorage.setItem('cachedPosts', JSON.stringify(data)); // Сохраняем в локальное хранилище
        return data;
    } catch (error) {
        console.error('Ошибка при загрузке постов:', error);
        throw error;
    }
}

// Функция для загрузки постов из локального хранилища
export function loadCachedPosts() {
    const cachedPosts = localStorage.getItem('cachedPosts');
    if (cachedPosts) {
        posts.set(JSON.parse(cachedPosts));
        return JSON.parse(cachedPosts);
    }
    return null;
}
<script>
    import { onMount } from 'svelte';
    import { posts, fetchPosts, loadCachedPosts } from '$lib/posts';

    let isLoading = true;
    let isCached = false;
    let error = null;

    onMount(async () => {
        try {
            await fetchPosts();
            alert('Данные из сервера загружены успешно.')
        } catch (err) {
            const cachedData = loadCachedPosts();
            if (cachedData) {
                alert('Не получилось загрузить данные из сервера. Достаем данные из кэша')
                isCached = true;
            } else {
                error = 'Нет данных для отображения.';
                alert(error)
            }
        } finally {
            isLoading = false;
        }
    });
</script>

{#if isLoading}
    <p>Загрузка...</p>
{:else if error}
    <p>{error}</p>
{:else}
    {#if isCached}
        <p>Данные загружены из кеша.</p>
    {/if}
    <ul>
        {#each $posts as post}
            <li>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
            </li>
        {/each}
    </ul>
{/if}
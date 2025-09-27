export const useCategories = async () => {
    const appConfig = useAppConfig();
    const { navbar } = appConfig;

    const posts = await queryCollection('posts')
        .orWhere(query => query
            .where('public','=', true)
        )
        .select('path', 'title', 'date', 'short')
        .order('date', 'DESC')
        .all();

    return navbar.map(category => {
        const list = posts.filter(post => category.id === post.path.split('/')[2]);
        const navPosts = list.map(post => ({
            "label": post.short,
            "uri": post.path + '/'
        }))
        return {
            ...category,
            items: [...category.items, ...navPosts]
        }
    });
}
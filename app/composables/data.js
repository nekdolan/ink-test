export const useCategories = async () => {
    const appConfig = useAppConfig();
    const { navbar } = appConfig;

    const videos = await queryCollection('videos')
        .orWhere(query => query
            .where('public','=', true)
        )
        .select('path', 'title', 'date', 'category', 'short')
        .order('date', 'DESC')
        .all();

    return navbar.map(category => {
        const list = videos.filter(video => category.id === video.category);
        const navVideos = list.map(video => ({
            "label": video.short,
            "uri": video.path + '/'
        }))
        return {
            ...category,
            items: [...category.items, ...navVideos]
        }
    });
}
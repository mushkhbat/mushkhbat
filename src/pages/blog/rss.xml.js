import rss from '@astrojs/rss';
const postImportResult = import.meta.glob('./**/*.mdx', { eager: true });
const posts = Object.values(postImportResult).sort((a, b) => new Date(b.frontmatter?.date) - new Date(a.frontmatter?.date));
export const get = () => rss({
    // `<title>` field in output xml
    title: 'مدونة مشخبط',
    // `<description>` field in output xml
    description: 'بعض من الكرتون، الأنمي آراء وأشياء أخرى قد لا تكون مهتمًا بها...',
    // base URL for RSS <item> links
    // SITE will use "site" from your project's astro.config.
    site: "https://www.mushkhbat.com/",
    // list of `<item>`s in output xml
    // simple example: generate items for every md file in /src/pages
    // see "Generating items" section for required frontmatter and advanced use cases
    items: posts.map((post) => ({
        link: encodeURI(post.url).replace("&", "%26"),
        title: post.frontmatter.title,
        description: post.frontmatter.desc,
        pubDate: post.frontmatter.date
      })),
    // (optional) inject custom xml
    customData: `<language>ar</language>`,
  });
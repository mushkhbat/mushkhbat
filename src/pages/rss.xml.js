import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeSanitize)
  .use(rehypeStringify);

export async function GET(context) {
  const showcases = await getCollection('showcases');
  const items = await Promise.all(
    showcases.map(async (post) => {
      const content = String(await processor.process(post.body));
      return {
        title: post.data.title,
        pubDate: post.data.publishDate,
        description: post.data.description,
        link: `/showcases/${post.slug}/`,
        content: content,
      };
    })
  );

  return rss({
    title: 'أعمال مشخبط',
    description: 'آخر أعمال وإنجازات فريق مشخبط.',
    site: context.site,
    items: items,
    customData: `<language>ar-sa</language>`,
  });
} 
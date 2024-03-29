import { getPostsByAuthorSlug } from 'lib/posts';
import { getUserByNameSlug } from 'lib/users';

import Title from 'components/Title';
import TemplateArchive from 'templates/archive';

export default function Author({ user, posts }) {
  const { name, avatar, slug } = user;

  const postOptions = {
    excludeMetadata: ['author'],
  };

  return (
    <>
      <TemplateArchive
        title={name}
        Title={<Title title={name} thumbnail={avatar} />}
        posts={posts}
        postOptions={postOptions}
        slug={slug}
      />
    </>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { user } = await getUserByNameSlug(params?.slug);

  if (!user) {
    return {
      props: {},
      notFound: true,
    };
  }

  const { posts } = await getPostsByAuthorSlug({
    slug: user?.slug,
    queryIncludes: 'archive',
  });

  return {
    props: {
      user,
      posts,
    },
  };
}

export async function getStaticPaths() {
  // By default, we don't render any Author pages as they're
  // we're considering them non-critical pages

  // To enable pre-rendering of Author pages:

  // 1. Add import to the top of the file
  //
  // import { getAllAuthors, userSlugByName } from 'lib/users';

  // 2. Uncomment the below
  //
  // const { authors } = await getAllAuthors();

  // const paths = authors.map((author) => {
  //   const { name } = author;
  //   return {
  //     params: {
  //       slug: userSlugByName(name),
  //     },
  //   };
  // });

  // 3. Update `paths` in the return statement below to reference the `paths` constant above

  return {
    paths: [],
    fallback: 'blocking',
  };
}

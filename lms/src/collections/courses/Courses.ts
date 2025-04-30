import type { CollectionConfig } from 'payload';
import { QuizBlock } from './blocks/QuizBlock';
import { VideoBlock } from './blocks/VideoBlock';

export const Courses: CollectionConfig = {
  slug: "courses",
  access: {
    read: ({ req: { user } }) => {
      return Boolean(user); //any logged-in user can do it
    },
    create: ({ req: { user } }) => {
      return user?.collection === "users"; //only if user from collection Users
    },
    update: ({ req: { user } }) => {
      return user?.collection === "users";
    },
    delete: ({ req: { user } }) => {
      return user?.collection === "users";
    }
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
    },
    {
      name: "image",
      label: "Image",
      type: "relationship",
      relationTo: "media",
      required: true,
    },
    {
      name: "curriculum",
      label: "Curriculum",
      type: "blocks",
      required: true,
      blocks: [
        QuizBlock,
         VideoBlock
      ]
    }
  ]
}
import { CollectionConfig } from "payload";

export const Participation: CollectionConfig = {
  slug: "participation",
  access: {
    read: ({ req: { user } }) => {
      return { customer: { equals: user?.email } };
    },
    update: ({ req: { user } }) => {
      return { customer: { equals: user?.email } };
    },
    delete: ({ req: { user } }) => {
      return { customer: { equals: user?.email } };
    },
    create: ({ req: { user }, data }) => {
      if (user?.collection === "users") {
        return true;
      } else if (user?.collection === "customers" && data?.customer === user?.email) {
        return true;
      } else {
        return false;
      }
    }
  },
  admin: {
    useAsTitle: "",
  },
  fields: [
    {
      name: "customer",
      label: "Customer",
      type:'text',
      required:true
    },
    {
      name: "course",
      label: "Course",
      type: "relationship",
      relationTo: "courses",
      required: true,
    },
    {
      name: "progress",
      label: "Progress",
      type: "number",
    }
  ]
}
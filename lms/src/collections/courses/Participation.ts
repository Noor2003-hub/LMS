import { CollectionConfig } from "payload";

export const Participation: CollectionConfig = {
  slug: "participation",
  access: {
    read: async ({ req }) => {
      const user = req.user;
      console.log(user?.id)
      // Allow admins (from "users" collection) to read all
      if (user?.collection === "users") return true;
    
      return { customer: { equals: user?.id } };
    },

    update: ({ req: { user } }) => {
      return { customer: { equals: user?.id } }; // Must match the `id`, not email
    },

    delete: ({ req: { user } }) => {
      return { customer: { equals: user?.id } }; // Same here
    },

    create: ({ req: { user }, data }) => {
      if (user?.collection === "users") {
        return true;
      } else if (user?.collection === "customers" && data?.customer === user?.id) {
        return true;
      } else {
        return false;
      }
    }
  },

  admin: {
    useAsTitle: "customer",
    group:'Courses'
  },

  fields: [
    {
      name: "customer",
      label: "Customer",
      type: "relationship",
      relationTo: "customers",
      required: true,
      admin: {
        width: '50%',
      },
      filterOptions: async ({ data, req }) => {
        const customers = await req.payload.find({
          collection: 'customers',
          where: {
            email: {
              contains: data?.email || '', // dynamically filter by email
            },
          },
          limit: 10,
        });
    
        return {
          id: {
            in: customers.docs.map((customer) => customer.id),
          },
        };
      },
    }
    ,
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
